import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert, ScrollView, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { onAuthStateChanged, updateProfile, signOut, deleteUser, } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";
import { doc, getDoc, setDoc, serverTimestamp, deleteDoc, collection, query, where, getDocs, } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import basePic from "../../assets/pictures/base_prof_pic.jpg";
import styles from "../style/ProfileScreen.style";

// == VALIDÁTOROK ==

const validUsername = (name) => /^[A-Za-z0-9_]+$/.test(name);

// telefonszám: csak számok, +, 7–15 számjegy
const validPhone = (value) => {
  if (!value) return true; // üresen hagyható
  return /^\+?[0-9]{7,15}$/.test(value);
};

async function isUsernameAvailableForUpdate(name, uid) {
  const q = query(collection(db, "users"), where("displayName", "==", name));
  const snap = await getDocs(q);
  if (snap.empty) return true;

  for (const d of snap.docs) {
    if (d.id !== uid) {
      return false;
    }
  }
  return true;
}

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [avatarUri, setAvatarUri] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // inline errorok
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setEmail("");
        setUsername("");
        setAvatarUri(null);
        setPhone("");
        setUsernameError("");
        setPhoneError("");
        return;
      }
      try {
        await user.reload();
      } catch {}

      const authEmail = user.email ?? "";
      const authName = user.displayName ?? "";
      const authPhoto = user.photoURL ?? null;

      let fsName = authName;
      let fsPhoto = authPhoto;
      let fsPhone = "";
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const d = snap.data();
          if (d?.displayName) fsName = d.displayName;
          if (d?.photoURL) fsPhoto = d.photoURL;
          if (d?.phone) fsPhone = d.phone;
        }
      } catch (e) {
        console.warn("Firestore read error", e);
      }

      setEmail(authEmail);
      setUsername(fsName);
      setPhone(fsPhone);
      if (fsPhoto) setAvatarUri(fsPhoto);
      setUsernameError("");
      setPhoneError("");
    });

    return unsub;
  }, []);

  async function uploadAvatarIfNeeded(uri, uid) {
    if (!uri) return null;

    // ha már http(s) URL, nem töltjük újra
    if (typeof uri === "string" && uri.startsWith("http")) return uri;

    const res = await fetch(uri);
    const blob = await res.blob();

    const storage = getStorage();
    const objectRef = ref(storage, `users/${uid}/avatar.jpg`);
    await uploadBytes(objectRef, blob);
    const downloadURL = await getDownloadURL(objectRef);
    return downloadURL;
  }

  const pickAvatar = async () => {
    if (!isEditing) return;
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert("Permission needed", "Permission needed to open Gallery");
        return;
      }
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });
      if (!res.canceled) setAvatarUri(res.assets[0].uri);
    } catch (e) {
      Alert.alert(
        "Error",
        e?.message ?? "Unknown error occurred while selecting the image."
      );
    }
  }; 

  const handleUsernameChange = (value) => {
    setUsername(value);
    const trimmed = value.trim();

    if (!trimmed) {
      setUsernameError("Username cannot be empty.");
    } else if (!validUsername(trimmed)) {
      setUsernameError(
        "Use only letters, numbers, or underscore (_). No spaces or other symbols."
      );
    } else {
      setUsernameError("");
    }
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    const trimmed = value.trim();

    if (!trimmed) {
      setPhoneError("");
      return;
    }
    if (!validPhone(trimmed)) {
      setPhoneError(
        "Enter a valid phone number (optional + at start, then 7–15 digits, no spaces)."
      );
    } else {
      setPhoneError("");
    }
  };

  const onSave = async () => {
    const trimmedName = username.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setUsernameError("Username cannot be empty.");
      return;
    }
    if (!validUsername(trimmedName)) {
      setUsernameError(
        "Use only letters, numbers, or underscore (_). No spaces or other symbols."
      );
      return;
    }
    if (!validPhone(trimmedPhone)) {
      setPhoneError(
        "Enter a valid phone number (optional + at start, then 7–15 digits, no spaces)."
      );
      return;
    }

    try {
      setSaving(true);

      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Not signed in", "Please log in again.");
        return;
      }

      const uid = user.uid;

      const nameAvailable = await isUsernameAvailableForUpdate(trimmedName, uid);
      if (!nameAvailable) {
        setUsernameError("This username is already taken.");
        return;
      }

      // 1) Avatar feltöltése (ha új képet választottál)
      const photoURL = await uploadAvatarIfNeeded(avatarUri, uid);

      // 2) Auth profil frissítés
      const profileUpdate = {};
      if (trimmedName && trimmedName !== (user.displayName ?? "")) {
        profileUpdate.displayName = trimmedName;
      }
      if (photoURL && photoURL !== (user.photoURL ?? "")) {
        profileUpdate.photoURL = photoURL;
      }
      if (Object.keys(profileUpdate).length > 0) {
        await updateProfile(user, profileUpdate);
      }

      // 3) Firestore users/{uid} frissítés
      const userDoc = {
        displayName: trimmedName,
        photoURL: photoURL ?? user.photoURL ?? null,
        phone: trimmedPhone,
        updatedAt: serverTimestamp(),
      };
      await setDoc(doc(db, "users", uid), userDoc, { merge: true });

      setIsEditing(false);
    } catch (e) {
      console.warn("Profile save error", e);
      Alert.alert("Save failed", e?.message ?? "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  const onCancelEdit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        const d = snap.data();
        setUsername(d?.displayName ?? user.displayName ?? "");
        setPhone(d?.phone ?? "");
        setAvatarUri(d?.photoURL ?? user.photoURL ?? null);
      }
    } catch (e) {
      console.warn("Failed to reset fields", e);
    }

    setUsernameError("");
    setPhoneError("");
    setIsEditing(false);
  };

  // Save disable logika
  const trimmedUsername = username.trim();
  const hasValidationError = !!usernameError || !!phoneError;
  const primaryDisabled = saving || hasValidationError || !trimmedUsername;

  const onSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
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

              try {
                const storage = getStorage();
                await deleteObject(ref(storage, `users/${uid}/avatar.jpg`));
              } catch (_) {}

              try {
                await deleteDoc(doc(db, "users", uid));
              } catch (_) {}

              try {
                await deleteUser(user);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
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
      contentContainerStyle={{ flexGrow: 1 }}
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
            <Text style={styles.subtitle}>
              Tap on 'Edit' to update your name, phone number or to change your
              profile picture.
            </Text>
          </View>
        </View>

        {/* BODY */}
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
                <Text style={styles.changePhotoText}>
                  Choose a new profile picture
                </Text>
              )}
            </TouchableOpacity>

            {/* Form */}
            <View style={styles.cardBody}>
              <TextInput
                style={[
                  styles.input,
                  isEditing && styles.disabledInput
                ]}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                editable={false}
              />

              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                value={username}
                onChangeText={handleUsernameChange}
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              {usernameError ? (
                <Text style={styles.errorText}>{usernameError}</Text>
              ) : null}

              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                editable={isEditing}
                selectTextOnFocus={isEditing}
              />
              {phoneError ? (
                <Text style={styles.errorText}>{phoneError}</Text>
              ) : null}

              {isEditing ? (
                <View style={styles.actionsRowWithoutMarginChange}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonDanger, styles.actionBtn]}
                    onPress={onCancelEdit}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      primaryDisabled && styles.buttonDisabled,
                      styles.actionBtn,
                    ]}
                    disabled={primaryDisabled}
                    onPress={onSave}
                  >
                    {saving ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Save</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Secondary actions */}
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary, styles.actionBtn]}
              onPress={onSignOut}
            >
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonDanger, styles.actionBtn]}
              onPress={onDeleteAccount}
            >
              <Text style={styles.buttonText}>Delete account</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => navigation.navigate("Calendar")}
            >
              <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
