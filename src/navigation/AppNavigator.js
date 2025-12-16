import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import LoginScreen from "../screens/LoginScreen";
import EventCreateScreen from "../screens/EventCreateScreen";
import EventDetailScreen from "../screens/EventDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen 
          name="AppTabs" 
          component={AppTabs}
          options={{
            animation: "fade"
          }}
        />
        <Stack.Screen 
          name="EventCreate" 
          component={EventCreateScreen} 
          options={{
            animation: "slide_from_bottom"
          }}
        />
        <Stack.Screen 
          name="EventDetail" 
          component={EventDetailScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
