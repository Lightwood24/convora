import React from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, Platform, KeyboardAvoidingView, ScrollView, } from "react-native";
import styles from "../style/ShareDialog.style";

export default function ShareDialog({
  visible,
  onClose,
  title = "Share your event",
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
                <Text style={styles.bodyTitle}>
                  Choose a method to share your event:
                </Text>
                <Text style={styles.bodyText}>
                  Copy the following link and share it with your friends...
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Event link"
                  placeholderTextColor="#9CA3AF"
                  editable={false}
                />
                <Text style={styles.bodyText}>
                  ...or choose the method below:
                </Text>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>E</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>M</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>W</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>T</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Text style={styles.actionBtnText}>D</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <Pressable onPress={onClose} style={styles.secondaryBtn}>
                  <Text style={styles.secondaryBtnText}>{secondaryLabel}</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}