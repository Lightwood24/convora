import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../style/ProfileScreen.style";
import basePic from "../../assets/pictures/base_prof_pic.jpg";
import { useNavigation } from "@react-navigation/native";
import {
  onAuthStateChanged,
  updateProfile,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [avatarUri, setAvatarUri] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setEmail("");
        setUsername("");
        setAvatarUri(null);
        setPhone("");
        return;
      }
      try { await user.reload(); } catch {}

      const authEmail = user.email ?? "";
      const authName  = user.displayName ?? "";
      const authPhoto = user.photoURL ?? null;

      let fsName = authName;
      let fsPhoto = authPhoto;
      let fsPhone = "";
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const d = snap.data();
          if (d?.displayName) fsName = d.displayName;
          if (d?.photoURL)    fsPhoto = d.photoURL;
          if (d?.phone)       fsPhone = d.phone;
        }
      } catch (e) {
        console.warn("Firestore read error", e);
      }

      setEmail(authEmail);
      setUsername(fsName);
      if (fsPhoto) setAvatarUri(fsPhoto);
      setPhone(fsPhone);
    });

    return unsub;
  }, []);

  async function uploadAvatarIfNeeded(uri, uid) {
    if (!uri) return null;
  
    // Ha már egy http(s) URL (pl. korábban feltöltött), nem kell újra feltölteni
    if (typeof uri === "string" && uri.startsWith("http")) return uri;
  
    // Expo: a helyi file URI-t blobbá alakítjuk és feltöltjük
    const res = await fetch(uri);
    const blob = await res.blob();
  
    const storage = getStorage();
    const objectRef = ref(storage, `users/${uid}/avatar.jpg`);
    await uploadBytes(objectRef, blob);
    const downloadURL = await getDownloadURL(objectRef);
    return downloadURL;
  }  
  
  const pickAvatar = async () => {
    if (!isEditing) return; // csak Edit módban engedélyezett
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert("Permission needed", "Permission needed to open Galery");
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });
      if (!res.canceled) setAvatarUri(res.assets[0].uri);
    } catch (e) {
      Alert.alert("Error", e?.message ?? "Unknown error occurred while selecting the image.");
    }
  };

  const onSave = async () => {
    try {
      setSaving(true);
  
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Not signed in", "Please log in again.");
        return;
      }
  
      const uid = user.uid;
  
      // 1) Avatar feltöltése (ha új képet választottál a galériából)
      const photoURL = await uploadAvatarIfNeeded(avatarUri, uid);
  
      // 2) Auth profil frissítése (csak displayName / photoURL)
      const profileUpdate = {};
      if (username?.trim() && username.trim() !== (user.displayName ?? "")) {
        profileUpdate.displayName = username.trim();
      }
      if (photoURL && photoURL !== (user.photoURL ?? "")) {
        profileUpdate.photoURL = photoURL;
      }
      if (Object.keys(profileUpdate).length > 0) {
        await updateProfile(user, profileUpdate);
      }
  
      // 3) Firestore users/{uid} frissítés (merge)
      const userDoc = {
        displayName: username?.trim() ?? "",
        photoURL: photoURL ?? user.photoURL ?? null,
        phone: phone?.trim() ?? "",
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(db, "users", uid), userDoc, { merge: true });
  
      setIsEditing(false);
      Alert.alert("Success", "Profile successfully updated");
    } catch (e) {
      console.warn("Profile save error", e);
      Alert.alert("Save failed", e?.message ?? "Unknown error");
    } finally {
      setSaving(false);
    }
  };
  

  // a fő gomb viselkedése: Edit -> Save
  const onPrimaryPress = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      onSave();
    }
  };

  // ha éppen mentünk, tiltjuk a gombot
  const primaryDisabled = saving;

  const onSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{name: "Login"}],
      });
    } catch (e) {
      Alert.alert("Sign out failed", e?.message ?? "Unknown error");
    }
  };

  
  const onDeleteAccount = () => {
    Alert.alert(
      "Delete account",
      "This will permanently remove your profile, avatar and data. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user) return;

              const uid = user.uid;

              // 1) Töröljük az avatart a Storage-ból (ha létezik)
              try {
                const storage = getStorage();
                await deleteObject(ref(storage, `users/${uid}/avatar.jpg`));
              } catch (_) { /* ha nincs meg, nem baj */ }

              // 2) Töröljük a users/{uid} doksit
              try {
                await deleteDoc(doc(db, "users", uid));
              } catch (_) {}

              // 3) Auth fiók törlése (lehet, hogy friss bejelentkezés kell)
              try {
                await deleteUser(user);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login"}],
                });
              } catch (err) {
                if (String(err?.code) === "auth/requires-recent-login") {
                  Alert.alert(
                    "Re-authentication required",
                    "Please sign in again, then retry deleting your account."
                  );
                } else {
                  throw err;
                }
              }
            } catch (e) {
              Alert.alert("Delete failed", e?.message ?? "Unknown error");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Profile Screen</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Tap on 'Edit' to update your name, phone number or to change your profile picture.</Text>
          </View>
        </View>

        {/* BODY (center) */}
        <View style={styles.bodySection}>
          <View style={styles.card}>
            {/* Avatar */}
            <TouchableOpacity
              onPress={pickAvatar}
              activeOpacity={isEditing ? 0.85 : 1}
              style={styles.avatarBtn}
              disabled={!isEditing}
            >
              <View style={styles.avatar}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
                ) : (
                  <Image source={basePic} style={styles.avatarImg} />
                )}
              </View>

              {isEditing && (
                <Text style={styles.changePhotoText}>Choose a new profile picture</Text>
              )}
            </TouchableOpacity>

            {/* Form */}
            <View style={styles.cardBody}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={false}          
                selectTextOnFocus={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />

              <TouchableOpacity
                style={[styles.button, primaryDisabled && styles.buttonDisabled]}
                disabled={primaryDisabled}
                onPress={onPrimaryPress}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>{isEditing ? "Save" : "Edit"}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Secondary actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[styles.buttonSecondary, styles.actionBtn]} onPress={onSignOut}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonDanger, styles.actionBtn]} onPress={onDeleteAccount}>
              <Text style={styles.buttonText}>Delete account</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <Text style={styles.footer}>Navigation</Text>
        </View>
      </View>
    </ScrollView>
  );
}