import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../style/ProfileScreen.style";
import basePic from "../../assets/pictures/base_prof_pic.jpg";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

export default function ProfileScreen() {
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
        return;
      }
      try { await user.reload(); } catch {}

      const authEmail = user.email ?? "";
      const authName  = user.displayName ?? "";
      const authPhoto = user.photoURL ?? null;

      let fsName = authName;
      let fsPhoto = authPhoto;
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const d = snap.data();
          if (d?.displayName) fsName = d.displayName;
          if (d?.photoURL)    fsPhoto = d.photoURL;
        }
      } catch (e) {
        console.warn("Firestore read error", e);
      }

      setEmail(authEmail);
      setUsername(fsName);
      if (fsPhoto) setAvatarUri(fsPhoto);
    });

    return unsub;
  }, []);

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
      // TODO: ide jön a tényleges mentés (Firebase / saját API)
      await new Promise((r) => setTimeout(r, 600));
      setIsEditing(false);
      Alert.alert("Success", "Prifile successfully updated");
    } catch (e) {
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

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Profile Screen</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Tap on 'Edit' to update your profile info or to change your profile picture.</Text>
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
                <Text style={styles.changePhotoText}>Choose a profile picture</Text>
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
                editable={isEditing}          
                selectTextOnFocus={isEditing} // UX: Edit módban egyből kijelöli
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
        </View>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <Text style={styles.footer}>Navigation</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}