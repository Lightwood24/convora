import React from "react";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Anta: require("./assets/fonts/Anta-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return <AppNavigator />;
}