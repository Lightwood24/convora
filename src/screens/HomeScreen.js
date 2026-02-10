import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { collection, query, where, orderBy, onSnapshot, doc, getDoc, updateDoc, arrayUnion, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import background from "../../assets/pictures/background.jpg";
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

  const handleScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y;
    setIsAtTop(offset <= 2);
  };

  // MEGHÍVÓ KEZELÉSE
  async function consumePendingInvite() {
    const inviteId = await AsyncStorage.getItem("pendingInviteId");  
    if (!inviteId) return null;
  
    const user = auth.currentUser;
  
    try {
      // Invite doc
      const inviteSnap = await getDoc(doc(db, "invites", inviteId));
  
      if (!inviteSnap.exists()) {
        await AsyncStorage.removeItem("pendingInviteId");
        return null;
      }
  
      const invite = inviteSnap.data() || {};
      const eventId = invite.eventId;
      const expiresAt = invite.expiresAt;
  
      if (!eventId) {
        await AsyncStorage.removeItem("pendingInviteId");
        return null;
      }
  
      // lejártság ellenőrzés
      if (expiresAt?.toDate) {
        const exp = expiresAt.toDate();
        if (exp.getTime() < Date.now()) {
          console.error("invite expired");
          await AsyncStorage.removeItem("pendingInviteId");
          return null;
        }
      }
  
      // felhasználó hozzáadása a résztvevőkhöz
      await updateDoc(doc(db, "events", eventId), {
        participants: arrayUnion(user.uid),
        updatedAt: serverTimestamp(),
      });
  
      await setDoc(
        doc(db, "events", eventId, "attendees", user.uid),
        { plusOne: false, updatedAt: serverTimestamp() },
        { merge: true }
      );
  
      // invite doc
      await setDoc(
        doc(db, "invites", inviteId, "uses", auth.currentUser.uid),
        { usedAt: serverTimestamp() },
        { merge: false }
      );

      // pendingInvite törlése
      await AsyncStorage.removeItem("pendingInviteId");
        
      return eventId;
    } catch (e) {
      console.error("invite error", e?.code, e?.message, e);
      return null;
    }
  }

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
  
      try {
        const joinedEventId = await consumePendingInvite();
        if (joinedEventId) navigation.navigate("EventDetail", { eventId: joinedEventId });
      } catch (e) {
        console.error("consumePendingInvite error:", e);
      }
    });
  
    return () => unsub();
  }, []);
  
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setEvents([]);
      return;
    }

    const q = query(
      collection(db, "events"),
      where("participants", "array-contains", user.uid),
      orderBy("startAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setEvents(list);
      },
      (error) => console.error("Error listening events:", error)
    );

    return () => unsubscribe();
  }, []);

  //SEGÉD FÜGGVÉNYEK
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
    <ImageBackground
    source={background}
    style={styles.background}
    resizeMode="cover"
    >
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
                    const fontSize = fontFamily === "Tangerine" || fontFamily === "Caveat" ? 21 : 12;

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
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => navigation.navigate("Profile")}
              >
                <Text style={styles.naviButtonText}>Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.naviButtonText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => navigation.navigate("Calendar")}
              >
                <Text style={styles.naviButtonText}>Calendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
