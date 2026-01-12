import React, { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../services/firebase";
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
  const goToTab = (tabName) => navigation.navigate("AppTabs", { screen: tabName });

  const route = useRoute();
  const eventId = route?.params?.eventId ?? null;

  const [event, setEvent] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // event betöltése az adatbázisból
  useEffect(() => {
    if (!eventId) {
      setEvent(null);
      setErrorMsg("Missing event id. Please open the event from the Home screen.");
      return;
    }

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
      },
      (err) => {
        console.error("EventDetail onSnapshot error:", err);
        setEvent(null);
        setErrorMsg(err?.message ?? "Failed to load event.");
      }
    );

    return () => unsub();
  }, [eventId]);

  const openMapForAddress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    Linking.openURL(url);
  };

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
  const baseFontSize =
    fontFamily === "Tangerine" ? 25 : fontFamily === "Caveat" ? 21 : 13;

  const currentUid = auth.currentUser?.uid ?? null;
  const participants = Array.isArray(event?.participants) ? event.participants : [];
  const isOwner = !!currentUid && event?.ownerId === currentUid;
  const isParticipant = !!currentUid && (participants.includes(currentUid) || isOwner);

  if (errorMsg) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={styles.errorText}>{errorMsg}</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonNavi]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ImageBackground
          source={bgSource}
          style={styles.eventCard}
          imageStyle={styles.eventCardImage}
        >
          {/* HEADER + BODY */}
          <KeyboardAwareScrollView
            contentContainerStyle={styles.eventScrollContent}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {/* HEADER */}
            <View style={[styles.headerSection, styles.eventCardOverlay]}>
              <View style={styles.header}>
                {/* EVENT TITLE */}
                <Text style={[styles.eventTitle, { fontFamily, fontSize: baseFontSize + 15 }]}>
                  {event?.title}
                </Text>
  
                <View style={styles.primaryActionsRow}>
                  {/* EVENT DATE */}
                  <Text
                    style={[styles.eventDate, { fontFamily, fontSize: baseFontSize }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {startAtLabel}
                  </Text>

                  {/* EVENT OWNER */}
                  <Text style={[styles.eventOwner, { fontFamily, fontSize: baseFontSize }]}>
                    {event?.username}
                  </Text>
                </View>
  
                {/* EVENT DESCRIPTION */}
                <Text style={[styles.eventDescription, { fontFamily, fontSize: baseFontSize + 6 }]}>
                  {event?.description}
                </Text>
              </View>
            </View>
  
            {/* BODY */}
            <View style={[styles.bodySection, styles.eventCardOverlay]}>
              {/* INVITEES */}
              <View style={[styles.box, styles.inviteesBox]}>
                <Text style={[styles.boxTitle, { fontFamily, fontSize: baseFontSize }]}>
                  Invited
                </Text>
              </View>
  
              {/* CHAT BOX */}
              <View style={[styles.box, styles.chatBox]}>
                <Text style={[styles.boxTitle, { fontFamily, fontSize: baseFontSize }]}>
                  Chat
                </Text>
              </View>
  
              {/* MAP */}
              <TouchableOpacity 
                style={styles.mapButton} 
                onPress={() => openMapForAddress(event?.location)}
              >
                <Text style={[styles.mapButtonText, { fontFamily, fontSize: baseFontSize }]}>
                  {event?.location}
                </Text>
              </TouchableOpacity>
            </View>
            
          </KeyboardAwareScrollView>
        </ImageBackground>

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.naviButton, styles.actionBtn]}
              onPress={() => goToTab("Profile")}
            >
              <Text style={styles.naviButtonText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.naviButton, styles.actionBtn]}
              onPress={() => goToTab("Home")}
            >
              <Text style={styles.naviButtonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.naviButton, styles.actionBtn]}
              onPress={() => goToTab("Calendar")}
            >
              <Text style={styles.naviButtonText}>Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
