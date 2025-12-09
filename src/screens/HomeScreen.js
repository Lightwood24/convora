import React from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/HomeScreen.style";

// ideiglenes demo adatok – később jöhetnek Firestore-ból
const MOCK_EVENTS = [
  {
    id: "1",
    title: "Event 1",
    dateLabel: "Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "2",
    title: "Event 2",
    dateLabel: "Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "3",
    title: "Event 3",
    dateLabel: "Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "4",
    title: "Event 4",
    dateLabel: "Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "5",
    title: "Event 5",
    dateLabel: "Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
  {
    id: "6",
    title: "Event 6",
    dateLabel: "Date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

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
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Home Screen</Text>
          </View>
        </View>

        {/* BODY */}
        <View style={styles.bodySection}>
          <View style={styles.eventList}>
            {MOCK_EVENTS.map((ev) => (
              <View key={ev.id} style={styles.eventCard}>
                <View style={styles.dateColumn}>
                  <View style={styles.dateBox}>
                    <Text style={styles.dateText}>{ev.dateLabel}</Text>
                  </View>
                </View>

                <View style={styles.eventContent}>
                  <Text style={styles.eventTitle} numberOfLines={1}>
                    {ev.title}
                  </Text>
                  <Text style={styles.eventSnippet} numberOfLines={2}>
                    {ev.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* New Event button */}
          <TouchableOpacity
            style={[styles.button, styles.newEventButton]}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <Text style={styles.buttonText}>New Event</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => navigation.navigate("Calendar")}
            >
              <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
