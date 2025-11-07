import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { useEffect } from 'react';
import { testUsers, testEvents, testInvites, testLinks, testAttendees } from './test/testFirestore';


export default function App() {
  // return <LoginScreen />;
  return <ProfileScreen />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
