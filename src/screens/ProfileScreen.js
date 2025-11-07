import React, { useState } from "react";
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
import styles from "./ProfileScreen.style";

export default function ProfileScreen() {
  const [avatarUri, setAvatarUri] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);

  const pickAvatar = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert("Engedély szükséges", "A fotók eléréséhez engedély kell.");
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
      Alert.alert("Hiba", e?.message ?? "Ismeretlen hiba a kép kiválasztásakor.");
    }
  };

  const onSave = async () => {
    try {
      setSaving(true);
      // TODO: ide jön a tényleges mentés (Firebase / saját API)
      await new Promise((r) => setTimeout(r, 600));
      Alert.alert("Siker", "Profil frissítve.");
    } catch (e) {
      Alert.alert("Mentés sikertelen", e?.message ?? "Ismeretlen hiba");
    } finally {
      setSaving(false);
    }
  };

  const disabled = saving || (!email.trim() && !username.trim() && !phone.trim());

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>ProfileScreen</Text>
            <Text style={styles.subtitle}>
              A felhasználó ezen a képernyőn tudja szerkeszteni a profilját. Felhasználónevet
              és email-címet tud változtatni, valamint itt tud telefonszámot és profilképet
              beállítani.
            </Text>
          </View>
        </View>

        {/* BODY (center) */}
        <View style={styles.bodySection}>
          <View style={styles.card}>
            {/* Avatar */}
            <TouchableOpacity onPress={pickAvatar} activeOpacity={0.85} style={styles.avatarBtn}>
              <View style={styles.avatar}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarIcon}>🖼️</Text>
                  </View>
                )}
              </View>
              <Text style={styles.changePhotoText}>Kép kiválasztása</Text>
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
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <TouchableOpacity
                style={[styles.button, disabled && styles.buttonDisabled]}
                disabled={disabled}
                onPress={onSave}
              >
                {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Edit</Text>}
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
