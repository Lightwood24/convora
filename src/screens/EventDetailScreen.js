import React, { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import styles from "../style/EventDetailScreen.style";

const TEMPLATE_BACKGROUNDS = {
  grim: require("../../assets/pictures/grim_card.png"),
  love: require("../../assets/pictures/love_card.png"),
  nature: require("../../assets/pictures/nature_card.png"),
  office: require("../../assets/pictures/office_card.png"),
  party: require("../../assets/pictures/party_card.png"),
  theatre: require("../../assets/pictures/theatre_card.png"),
};

export default function EventDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const eventId = route?.params?.eventId ?? null;

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const goToTab = (tabName) => navigation.navigate("AppTabs", { screen: tabName });

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      setEvent(null);
      setErrorMsg("Missing event id. Please open the event from the Home screen.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const ref = doc(db, "events", eventId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setEvent(null);
          setErrorMsg("This event no longer exists.");
        } else {
          setEvent({ id: snap.id, ...snap.data() });
          setErrorMsg("");
        }
        setLoading(false);
      },
      (err) => {
        console.error("EventDetail onSnapshot error:", err);
        setEvent(null);
        setErrorMsg(err?.message ?? "Failed to load event.");
        setLoading(false);
      }
    );

    return () => unsub();
  }, [eventId]);

  const startAtLabel = useMemo(() => {
    if (!event?.startAt) return "";
    const d = event.startAt?.toDate ? event.startAt.toDate() : new Date(event.startAt);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  }, [event?.startAt]);

  const bgSource = useMemo(() => {
    const id = event?.templateId ?? "party";
    return TEMPLATE_BACKGROUNDS[id] || TEMPLATE_BACKGROUNDS.party;
  }, [event?.templateId]);

  const fontFamily = event?.fontFamily || "Anta";
  const baseFontSize = fontFamily === "Tangerine" || fontFamily === "Caveat" ? 21 : 13;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>   

        <ImageBackground
          source={bgSource}
          style={styles.eventCard}
          imageStyle={styles.eventCardImage}
        >
            {/* HEADER */}
            <View style={[styles.headerSection, styles.eventCardOverlay]}>
              <View style={styles.header}>
                <Text 
                  style={[styles.eventTitle, { fontFamily, fontSize: baseFontSize + 15}]}
                >
                  {event?.title}
                </Text>
                <View style={styles.primaryActionsRow}>
                  <Text
                    style={[styles.eventDate, { fontFamily, fontSize: baseFontSize}]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {startAtLabel}
                  </Text>
                  <Text 
                    style={[styles.eventOwner, { fontFamily, fontSize: baseFontSize}]}
                  >
                    - username
                  </Text>
                </View>
                <Text 
                  style={[styles.eventDescription, { fontFamily, fontSize: baseFontSize + 6}]}
                >
                  {event?.description}
                </Text>
              </View>
            </View>

            {/* BODY (center) */}
            <View style={[styles.bodySection, styles.eventCardOverlay]}>
              {/* TODO */}
            </View>
        </ImageBackground>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <View style={styles.actionsRow}>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => goToTab("Profile")}
            >
              <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => goToTab("Home")}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.buttonNavi, styles.actionBtn]}
              onPress={() => goToTab("Calendar")}
            >
              <Text style={styles.buttonText}>Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </KeyboardAwareScrollView>
  );
}
