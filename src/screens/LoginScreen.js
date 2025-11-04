import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
  Pressable,
} from "react-native";
import { registerWithEmail, loginWithEmail } from "../services/auth";

// Androidon engedélyezni kell az animációt
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LoginScreen() {
  const [activeCard, setActiveCard] = useState("login"); // login / register
  const [loading, setLoading] = useState(false);

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const toggleCard = (type) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveCard(activeCard === type ? null : type);
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      await loginWithEmail(loginEmail.trim(), loginPassword);
      Alert.alert("Success", "Logged in successfully");
    } catch (e) {
      Alert.alert("Login failed", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async () => {
    try {
      setLoading(true);
      await registerWithEmail(regEmail.trim(), regPassword, regName.trim());
      Alert.alert("Success", "Account created & signed in");
    } catch (e) {
      Alert.alert("Register failed", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const loginDisabled = !loginEmail || !loginPassword || loading;
  const regDisabled = !regName || !regEmail || !regPassword || loading;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.logoBox} />
        <Text style={styles.appName}>Convora</Text>
      </View>

      {/* LOGIN CARD */}
      <View style={styles.card}>
        <Pressable
          onPress={() => toggleCard("login")}
          style={styles.cardHeader}
        >
          <Text style={styles.cardTitle}>Login</Text>
          <Text style={styles.arrow}>
            {activeCard === "login" ? "▲" : "▼"}
          </Text>
        </Pressable>

        {activeCard === "login" && (
          <View style={styles.cardBody}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={loginEmail}
              onChangeText={setLoginEmail}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={loginPassword}
              onChangeText={setLoginPassword}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={[styles.button, loginDisabled && styles.buttonDisabled]}
              onPress={onLogin}
              disabled={loginDisabled}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* REGISTER CARD */}
      <View style={styles.card}>
        <Pressable
          onPress={() => toggleCard("register")}
          style={styles.cardHeader}
        >
          <Text style={styles.cardTitle}>Register</Text>
          <Text style={styles.arrow}>
            {activeCard === "register" ? "▲" : "▼"}
          </Text>
        </Pressable>

        {activeCard === "register" && (
          <View style={styles.cardBody}>
            <TextInput
              placeholder="Display name"
              value={regName}
              onChangeText={setRegName}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={regEmail}
              onChangeText={setRegEmail}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={regPassword}
              onChangeText={setRegPassword}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={[styles.button, regDisabled && styles.buttonDisabled]}
              onPress={onRegister}
              disabled={regDisabled}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.footer}>Footer</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    paddingTop: 48,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  appName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  card: {
    width: "86%",
    backgroundColor: "#1d1d1d",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cardBody: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  arrow: {
    color: "#aaa",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    color: "#fff",
  },
  button: {
    height: 44,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    color: "#888",
    marginTop: 8,
  },
});
