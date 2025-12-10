import React from "react";
import { useFonts } from "expo-font";
import { View, ActivityIndicator } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Anta: require("./assets/fonts/Anta-Regular.ttf"),
    Cinzel: require("./assets/fonts/Cinzel-VariableFont_wght.ttf"),
    Tangerine: require("./assets/fonts/Tangerine-Bold.ttf"),
    Merienda: require("./assets/fonts/Merienda-VariableFont_wght.ttf"),
    Caveat: require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
    Monoton: require("./assets/fonts/Monoton-Regular.ttf"),
    Bitcount: require("./assets/fonts/BitcountSingleInk-VariableFont_CRSV,ELSH,ELXP,SZP1,SZP2,XPN1,XPN2,YPN1,YPN2,slnt,wght.ttf"),
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