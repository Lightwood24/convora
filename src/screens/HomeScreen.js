import React, { useState, useEffect, useMemo } from "react";
import { Text, ScrollView, View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../services/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import styles from "../style/HomeScreen.style";
import theme from "../style/Theme";

const TEMPLATE_BACKGROUNDS = {
  grim: require("../../assets/pictures/grim_card.png"),
  love: require("../../assets/pictures/love_card.png"),
  nature: require("../../assets/pictures/nature_card.png"),
  office: require("../../assets/pictures/office_card.png"),
  party: require("../../assets/pictures/party_card.png"),
  theatre: require("../../assets/pictures/theatre_card.png"),
};

export default function HomeScreen() {
  const navigation = useNavigation();
  
  const [isAtTop, setIsAtTop] = useState(true);
  const [events, setEvents] = useState([]);

  const LARGE_FONTS = useMemo(() => new Set(["Tangerine", "Caveat"]), []);
  const getFontSize = (fontFamily) => (LARGE_FONTS.has(fontFamily) ? 21 : 12);

  const handleScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    setIsAtTop(offset <= 2);
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setEvents([]);
      return;
    }

    const q = query(
      collection(db, "events"),
      where("ownerId", "==", user.uid),
      orderBy("startAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        setEvents(list);
      },
      (error) => console.error("Error listening events:", error)
    );

    return () => unsubscribe();
  }, []);

  const formatDateLabel = (startAt) => {
    if (!startAt) return "";
    const d = startAt.toDate ? startAt.toDate() : new Date(startAt);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
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

            <ScrollView
              style={styles.eventsList}
              contentContainerStyle={styles.eventsListContent}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {events.length === 0 ? (
                <Text
                  style={{
                    ...theme.typography.small,
                    color: theme.colors.textMuted,
                    textAlign: "center",
                    marginTop: theme.spacing.md,
                  }}
                >
                  You have no events yet.
                </Text>
              ) : (
                events.map((event) => {
                  const bgSource =
                    TEMPLATE_BACKGROUNDS[event.templateId] || TEMPLATE_BACKGROUNDS.party;

                  const fontFamily = event.fontFamily || "Anta";
                  const fontSize = getFontSize(fontFamily);

                  const dateLabel = formatDateLabel(event.startAt);
                  const description =
                    event.description && event.description.trim().length > 0
                      ? event.description.trim()
                      : "No description provided.";

                  return (
                    <TouchableOpacity
                      key={event.id}
                      style={{ flex: 1 }}
                      onPress={() => {navigation.navigate("EventDetail", { eventId: event.id })}}
                    >
                      <ImageBackground
                        source={bgSource}
                        style={styles.eventCard}
                        imageStyle={styles.eventCardImage}
                      >
                        <View style={styles.eventCardOverlay}>
                          <Text
                            style={[styles.eventTitle, { fontFamily, fontSize }]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {event.title}
                          </Text>

                          <Text
                            style={[
                              styles.eventDate,
                              { fontFamily, fontSize: Math.max(12, fontSize - 4) },
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {dateLabel}
                          </Text>
                          <Text
                            style={[
                              styles.eventDescription,
                              { fontFamily, fontSize: Math.max(12, fontSize - 2) },
                            ]}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {description}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>

            <LinearGradient
              colors={["transparent", theme.colors.background]}
              style={styles.fadeBottom}
              pointerEvents="none"
            />
          </View>

          <TouchableOpacity
            style={styles.newEventButton}
            onPress={() => navigation.navigate("EventCreate")}
          >
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
