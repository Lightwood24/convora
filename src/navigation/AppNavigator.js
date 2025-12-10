import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import LoginScreen from "../screens/LoginScreen";
import EventCreateScreen from "../screens/EventCreateScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AppTabs" component={AppTabs} />
        <Stack.Screen name="EventCreate" component={EventCreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
