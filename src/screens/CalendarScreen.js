import {Text, ScrollView, View, TouchableOpacity, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import background from  "../../assets/pictures/background.jpg"
import styles from "../style/CalendarScreen.style";

export default function CalendarScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
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
              <Text style={styles.screenTitle}>Calendar Screen</Text>
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
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={styles.naviButtonText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.naviButtonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => navigation.navigate("Calendar")}
              >
                <Text style={styles.naviButtonText}>Calendar</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}
