import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ExpoLinking from "expo-linking";
import AppTabs from "./AppTabs";
import LoginScreen from "../screens/LoginScreen";
import EventCreateScreen from "../screens/EventCreateScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import InviteJoinScreen from "../screens/InviteJoinScreen";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [
    ExpoLinking.createURL("/"),
  ],
  config: {
    screens: {
      Login: "login",
      AppTabs: "tabs",
      EventCreate: "event-create",
      EventDetail: "event/:eventId",
      InviteJoin: "invite/:inviteId",
    },
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
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

        <Stack.Screen
          name="InviteJoin"
          component={InviteJoinScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
