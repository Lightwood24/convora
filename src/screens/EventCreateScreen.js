import React from "react";
import styles from "../style/EventCreateScreen.style";
import {Text, ScrollView, View, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EventCreateScreen() {
  const navigation = useNavigation();

  const goToTab = (tabName) => {
    navigation.navigate("AppTabs", { screen: tabName });
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>   

        {/* HEADER */}
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Event Create Screen</Text>
          </View>
        </View>

        {/* BODY (center) */}
        <View style={styles.bodySection}>
          {/* TODO */}
        </View>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => goToTab("Profile")}
            >
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => goToTab("Home")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => goToTab("Calendar")}
            >
              <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}
