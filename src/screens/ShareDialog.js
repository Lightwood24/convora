import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Image, Pressable, Platform, KeyboardAvoidingView, ScrollView, Share, } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import styles from "../style/ShareDialog.style";
import discord from "../../assets/icons/discord_icon.png";
import messenger from "../../assets/icons/messenger_icon.png";
import whatsapp from "../../assets/icons/whatsapp_icon.png";
import twitter from "../../assets/icons/twitter_icon.png";
import gmail from "../../assets/icons/gmail_icon.png";

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
                  <Text style={styles.footerBtnText}>Back to home</Text>
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