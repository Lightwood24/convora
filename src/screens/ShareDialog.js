import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, Platform, KeyboardAvoidingView, ScrollView, Share, } from "react-native";
import * as Clipboard from "expo-clipboard";
import styles from "../style/ShareDialog.style";

const LANDING_BASE_URL = "https://convora-c72ee.web.app";

export default function ShareDialog({
  visible,
  onClose,
  title = "Share your event",
  inviteId,
}) {
  const [landingLink, setLandingLink] = useState("");

  useEffect(() => {
    if (!visible) return;

    if (!inviteId) {
      setLandingLink("");
      return;
    }

    setLandingLink(`${LANDING_BASE_URL}/i/${inviteId}`);
  }, [visible, inviteId]);

  // FÜGGVÉNYEK
  const handleCopyLink = async () => {
    if (!landingLink) return;
    await Clipboard.setStringAsync(landingLink);
    alert("Link copied.");
  };

  const handleShare = async () => {
    if (!landingLink) return;
  
    await Share.share({
      message: `You're invited!\n\n${landingLink}`,
      url: landingLink,
    });
  };
  

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.centerWrap} onPress={() => {}}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.kav}
          >
            <View style={styles.card}>

              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Pressable onPress={onClose} hitSlop={12} style={styles.closeBtn}>
                  <Text style={styles.closeText}>✕</Text>
                </Pressable>
              </View>

              {/* Body */}
              <ScrollView
                style={styles.body}
                contentContainerStyle={styles.bodyContent}
                keyboardShouldPersistTaps="handled"
              >
                <Text style={styles.bodyTitle}>Choose a method to share your event:</Text>

                <Text style={styles.bodyText}>
                  Tap on the following link to copy it and share it with your friends...
                </Text>

                <Pressable
                  onPress={handleCopyLink}
                  style={({ pressed }) => [
                    styles.inputPressable,
                    pressed && styles.inputPressed,
                  ]}
                >
                  <Text
                    style={styles.inputText}
                    numberOfLines={1}
                    ellipsizeMode="middle"
                  >
                    {landingLink || "Event link"}
                  </Text>
                </Pressable>

                <Text style={styles.bodyText}>...or tap on share, to choose other sharing metholds!</Text>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <Pressable onPress={onClose} style={styles.secondaryBtn}>
                  <Text style={styles.footerBtnText}>Back</Text>
                </Pressable>

                <Pressable onPress={handleShare} style={styles.primaryBtn}>
                  <Text style={styles.footerBtnText}>Share your event</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}