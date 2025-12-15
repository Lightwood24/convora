import styles from "../style/EventDetailScreen.style";
import {Text, ScrollView, View, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EventDetailScreen() {
  const navigation = useNavigation();
  const goToTab = (tabName) => navigation.navigate("AppTabs", { screen: tabName });

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
          {/* TODO */}
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
