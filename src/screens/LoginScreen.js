import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Animated,
} from "react-native";
import { registerWithEmail, loginWithEmail } from "../services/auth";
import styles from "./LoginScreen.styles";


export default function LoginScreen() {
  const [activeCard, setActiveCard] = useState("login");
  const [loading, setLoading] = useState(false);
  const headerOffset = useRef(new Animated.Value(0)).current;

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const toggleCard = (type) => {
    setActiveCard(activeCard === type ? null : type);
  };

  useEffect(() => {
    const toValue = activeCard ? -20 : 0; // lift header slightly when a card is open
    Animated.timing(headerOffset, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeCard, headerOffset]);

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
      <View style={styles.content}>
        {/* HEADER (top) */}
        <View style={styles.headerSection}>
          <Animated.View style={[styles.header, { transform: [{ translateY: headerOffset }] }]}>
            <View style={styles.logoBox} />
            <Text style={styles.appName}>Convora</Text>
          </Animated.View>
        </View>

        {/* BODY (middle) */}
        <View style={styles.bodySection}>
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
        </View>

        {/* FOOTER (bottom) */}
        <View style={styles.footerSection}>
          <Text style={styles.footer}>A Thesis app made by Daniel Kiss</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
