import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Pressable, Animated, ScrollView, Image, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { registerWithEmail, loginWithEmail } from "../services/auth";
import { auth, db } from "../services/firebase";
import passwordShowIcon from "../../assets/pictures/password_show.png";
import passwordHideIcon from "../../assets/pictures/password_hide.png";
import convoraLogo from "../../assets/pictures/convora_logo.png";
import styles from "../style/LoginScreen.style";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [activeCard, setActiveCard] = useState("login");
  const [loading, setLoading] = useState(false);
  const headerOffset = useRef(new Animated.Value(0)).current;

  // login konstansok
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // register konstansok
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const toggleCard = (type) => {
    setActiveCard(activeCard === type ? null : type);
  };

  useEffect(() => {
    const toValue = activeCard ? -20 : 0;
    Animated.timing(headerOffset, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [activeCard, headerOffset]);

  // == VALIDATION ==
  // inline errorok
  const [regNameError, setRegNameError] = useState("");
  const [regEmailError, setRegEmailError] = useState("");
  const [regPasswordError, setRegPasswordError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
  const strongPw = (pw) => /^(?=.*[A-Z])(?=.*\d).{9,}$/.test(pw);   // min 9, 1 nagybetű, 1 szám
  const validUsername = (name) => /^[A-Za-z0-9_]+$/.test(name);     // csak betű, szám, és underscore

  async function isEmailAvailable(email) {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length === 0;
  }

  async function isUsernameAvailable(name) {
    const q = query(collection(db, "users"), where("displayName", "==", name));
    const snap = await getDocs(q);
    return snap.empty;
  }

  // == LOGIN ==
  const onLogin = async () => {
    try {
      setLoading(true);
      const user = await loginWithEmail(loginEmail.trim(), loginPassword);

      if (!user.emailVerified) {
        Alert.alert(
          "Email not verified",
          "Please confirm your email address first. Check your inbox (and spam) for the verification email."
        );
        await auth.signOut();
        return;
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "AppTabs" }],
      });
    } catch (e) {
      Alert.alert("Login failed", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // == REGISTER ==
  const onRegister = async () => {
    try {
      setLoading(true);

      const email = regEmail.trim();
      const name = regName.trim();
      const pw = regPassword;

      if (!emailRegex.test(email) || !validUsername(name) || !strongPw(pw)) {
        return;
      }

      // Foglaltság ellenőrzés
      const [emailFree, nameFree] = await Promise.all([
        isEmailAvailable(email),
        isUsernameAvailable(name),
      ]);

      if (!emailFree) {
        Alert.alert("Email already in use", "Try signing in or use another email.");
        return;
      }
      if (!nameFree) {
        Alert.alert("Username taken", "Please choose a different username.");
        return;
      }

      // Regisztráció
      await registerWithEmail(email, pw, name);

      Alert.alert(
        "Success",
        "Account created. We sent you a verification email — please confirm before using all features."
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "AppTabs" }],
      });
    } catch (e) {
      Alert.alert("Register failed", e?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // button disable logika
  const loginDisabled = !loginEmail || !loginPassword || loading;
  const regDisabled =
    !regName ||
    !regEmail ||
    !regPassword ||
    !!regNameError ||
    !!regEmailError ||
    !!regPasswordError ||
    loading;

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>
        {/* HEADER (top) */}
        <View style={styles.headerSection}>
          <Animated.View
            style={[styles.header, { transform: [{ translateY: headerOffset }] }]}
          >
            <Image source={convoraLogo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.appName}>Convora</Text>
          </Animated.View>
        </View>

        {/* BODY */}
        <View style={styles.bodySection}>
          {/* LOGIN CARD */}
          <View style={styles.card}>
            <Pressable onPress={() => toggleCard("login")} style={styles.cardHeader}>
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
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={!showLoginPassword}
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    style={styles.input}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity
                    onPress={() => setShowLoginPassword(!showLoginPassword)}
                    style={styles.passwordIcon}
                  >
                    <Image
                      source={showLoginPassword ? passwordHideIcon : passwordShowIcon}
                      style={{ width: 20, height: 20, tintColor: "#3b82f6" }}
                    />
                  </TouchableOpacity>
                </View>
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
                {/* USERNAME */}
                <TextInput
                  placeholder="Display name"
                  value={regName}
                  onChangeText={(text) => {
                    setRegName(text);
                    const trimmed = text.trim();
                    if (!trimmed) {
                      setRegNameError("Username is required.");
                    } else if (!validUsername(trimmed)) {
                      setRegNameError(
                        "Use only letters, numbers, or underscore (_). No spaces or other symbols."
                      );
                    } else {
                      setRegNameError("");
                    }
                  }}
                  style={styles.input}
                  placeholderTextColor="#888"
                />
                {regNameError ? (
                  <Text style={styles.errorText}>{regNameError}</Text>
                ) : null}

                {/* EMAIL */}
                <TextInput
                  placeholder="Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={regEmail}
                  onChangeText={(text) => {
                    setRegEmail(text);
                    const trimmed = text.trim();
                    if (!trimmed) {
                      setRegEmailError("Email is required.");
                    } else if (!emailRegex.test(trimmed)) {
                      setRegEmailError(
                        "Please enter a valid email address (something@domain.tld)."
                      );
                    } else {
                      setRegEmailError("");
                    }
                  }}
                  style={styles.input}
                  placeholderTextColor="#888"
                />
                {regEmailError ? (
                  <Text style={styles.errorText}>{regEmailError}</Text>
                ) : null}

                {/* PASSWORD */}
                <View style={{ position: "relative" }}>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={!showRegPassword}
                    value={regPassword}
                    onChangeText={(text) => {
                      setRegPassword(text);
                      if (!text) {
                        setRegPasswordError("Password is required.");
                      } else if (!strongPw(text)) {
                        setRegPasswordError(
                          "Min. 9 characters, at least 1 uppercase letter and 1 number."
                        );
                      } else {
                        setRegPasswordError("");
                      }
                    }}
                    style={styles.input}
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity
                    onPress={() => setShowRegPassword(!showRegPassword)}
                    style={styles.passwordIcon}
                  >
                    <Image
                      source={showRegPassword ? passwordHideIcon : passwordShowIcon}
                      style={{ width: 20, height: 20, tintColor: "#3b82f6" }}
                    />
                  </TouchableOpacity>
                </View>
                {regPasswordError ? (
                  <Text style={styles.errorText}>{regPasswordError}</Text>
                ) : null}

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

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <Text style={styles.footer}>A Thesis app made by Daniel Kiss</Text>
        </View>
      </View>
    </ScrollView>
  );
}
