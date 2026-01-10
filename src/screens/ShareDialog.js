import React from "react";
import { Modal, View, Text, Pressable, Platform, KeyboardAvoidingView, ScrollView, } from "react-native";
import styles from "../style/ShareDialog.style";

export default function ShareDialog({
  visible,
  onClose,
  title = "Share your event",
  primaryLabel = "Send Invite",
  onPrimaryPress = () => {},
  secondaryLabel = "Cancel",
}) {
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
                <Text style={styles.placeholder}>
                  TODO
                </Text>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <Pressable onPress={onClose} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>{secondaryLabel}</Text>
                </Pressable>

                <Pressable onPress={onPrimaryPress} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>{primaryLabel}</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}