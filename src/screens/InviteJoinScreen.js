import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import { auth } from "../services/firebase";

export default function InviteJoinScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const inviteId = route?.params?.inviteId ?? null;
  
  useEffect(() => {
    const run = async () => {
      if (!inviteId) {
        navigation.navigate("AppTabs", { screen: "Home" });
        return;
      }
  
      await AsyncStorage.setItem("pendingInviteId", inviteId);
  
      if (auth.currentUser) {
        navigation.navigate("AppTabs", { screen: "Home" });
      } else {
        navigation.navigate("Login");
      }
    };
  
    run();
  }, [inviteId]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Opening invitation…</Text>
    </View>
  );
}
