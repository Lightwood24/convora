import React, {useState} from "react";
import { Text, ScrollView, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/HomeScreen.style";
import {LinearGradient} from "expo-linear-gradient";
import theme from "../style/Theme"; 

const MOCK_EVENTS = [
  { id: "1", title: "Event 1", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "2", title: "Event 2", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "3", title: "Event 3", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "4", title: "Event 4", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "5", title: "Event 5", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "6", title: "Event 6", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: "7", title: "Event 7", dateLabel: "Date", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isAtTop, setIsAtTop] = useState(true);

  const handleScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    setIsAtTop(offset <= 2);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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
        <Text style={styles.sectionTitle}>Upcoming events</Text>
        <View style={styles.eventsListContainer}>

        {!isAtTop && (
          <LinearGradient
            colors={[theme.colors.background, "transparent"]}
            style={styles.fadeTop}
            pointerEvents="none"
          />
        )}

        {!isAtTop && (
          <LinearGradient
            colors={["transparent", theme.colors.background]}
            style={styles.fadeBottom}
            pointerEvents="none"
          />
        )}

        <ScrollView
          style={styles.eventsList}
          contentContainerStyle={styles.eventsListContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {MOCK_EVENTS.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
            </View>
          ))}
        </ScrollView>

        <LinearGradient
          colors={['transparent', theme.colors.background]}
          style={styles.fadeBottom}
          pointerEvents="none"
        />

        </View>
        <TouchableOpacity style={styles.newEventButton}>
          <Text style={styles.newEventButtonText}>New event</Text>
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
