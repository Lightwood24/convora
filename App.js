import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { useEffect } from 'react';
import { testUsers, testEvents, testInvites, testLinks, testAttendees } from './test/testFirestore';


export default function App() {
  return <HomeScreen />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
