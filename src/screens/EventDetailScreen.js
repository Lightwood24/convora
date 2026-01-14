import React, { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, Linking, ScrollView, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doc, onSnapshot, collection, query, where, orderBy, limit, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import styles from "../style/EventDetailScreen.style";
import ShareDialog from "./ShareDialog";

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

  const [participantsProfiles, setParticipantsProfiles] = useState({});

  const [isShareOpen, setShareOpen] = useState(false);
  const [savedInviteId, setSavedInviteId] = useState(null);

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

  useEffect(() => {
    let cancelled = false;
  
    const loadParticipantsProfiles = async () => {
      if (!participants || participants.length === 0) {
        setParticipantsProfiles({});
        return;
      }
  
      try {
        const results = {};
        await Promise.all(
          participants.map(async (uid) => {
            try {
              const snap = await getDoc(doc(db, "users", uid));
              if (snap.exists()) {
                const data = snap.data() || {};
                results[uid] = {
                  displayName: data.displayName || "Unknown user",
                  photoURL: data.photoURL || "",
                };
              } else {
                results[uid] = { displayName: "Unknown user", photoURL: "" };
              }
            } catch {
              results[uid] = { displayName: "Unknown user", photoURL: "" };
            }
          })
        );
  
        if (!cancelled) setParticipantsProfiles(results);
      } catch (e) {
        console.error("Failed to load participants profiles:", e);
        if (!cancelled) setParticipantsProfiles({});
      }
    };
  
    loadParticipantsProfiles();
  
    return () => {
      cancelled = true;
    };
  }, [event?.participants]);
  

  const openMapForAddress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    Linking.openURL(url);
  };

  const handleShare = async () => {
    try {
      if (!eventId) return;
  
      if (!isOwner) {
        alert("Only the event owner can share this event.");
        return;
      }
  
      // legutóbbi invite az eventhez
      const q = query(
        collection(db, "invites"),
        where("eventId", "==", eventId),
        orderBy("createdAt", "desc"),
        limit(1)
      );
  
      const snap = await getDocs(q);
  
      if (snap.empty) {
        alert("No invite found for this event.");
        return;
      }
  
      const inviteDoc = snap.docs[0];
      setSavedInviteId(inviteDoc.id);
      setShareOpen(true);
    } catch (e) {
      console.error("handleShare error:", e);
  
      alert("Could not load invite for sharing. Please try again.");
    }
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
  const baseFontSize = fontFamily === "Tangerine" ? 25 : fontFamily === "Caveat" ? 21 : 13;

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
              {/* PARTICIPANTS */}
              <View style={[styles.box, styles.participantsBox]}>
                <Text style={[styles.boxTitle, { fontFamily, fontSize: baseFontSize }]}>
                  Participants:
                </Text>

                <View style={styles.participantsList}>
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.participantsListContent}
                  >
                    {participants.length === 0 ? (
                      <Text style={[styles.participantEmpty, { fontFamily }]}>
                        No participants yet.
                      </Text>
                    ) : (
                      participants.map((uid) => {
                        const profile = participantsProfiles[uid];
                        const name = profile?.displayName || "Loading…";
                        const photoURL = profile?.photoURL || "";
                      
                        return (
                          <View key={uid} style={styles.participantRow}>
                            <View style={styles.participantRowInner}>
                              <Image
                                source={{ uri: photoURL }}
                                style={styles.participantAvatar}
                              />
                              <Text
                                style={[
                                  styles.participantText,
                                  { fontFamily, fontSize: baseFontSize },
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {name}
                              </Text>
                            </View>
                          </View>
                        );
                      })
                    )}
                  </ScrollView>
                </View>
              </View>
  
              {/* CHAT BOX */}
              <View style={[styles.box, styles.chatBox]}>
                <Text style={[styles.boxTitle, { fontFamily, fontSize: baseFontSize }]}>
                  Chat
                </Text>
              </View>
  
              {/* MAP */}
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => openMapForAddress(event?.location)}
              >
                <Text style={[styles.actionButtonText, { fontFamily, fontSize: baseFontSize }]}>
                  {event?.location}
                </Text>
              </TouchableOpacity>

              {/* Share */}
              {isOwner && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleShare}
                >
                  <Text style={[styles.actionButtonText, { fontFamily, fontSize: baseFontSize }]}>
                    Share
                  </Text>
                </TouchableOpacity>
              )}
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

      {/* SHARE DIALOG */}
      <ShareDialog
        visible={isShareOpen}
        onClose={() => setShareOpen(false)}
        title="Share your event"
        inviteId={savedInviteId}
      />
    </View>
  );
}
