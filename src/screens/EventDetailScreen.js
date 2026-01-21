import React, { useEffect, useMemo, useState } from "react";
import { Text, View, TouchableOpacity, ImageBackground, Linking, ScrollView, Image, Platform, KeyboardAvoidingView, TextInput, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { doc, onSnapshot, collection, query, where, orderBy, limit, getDocs, getDoc, setDoc, serverTimestamp, addDoc, updateDoc, arrayRemove, deleteDoc, } from "firebase/firestore";
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

  const currentUid = auth.currentUser?.uid ?? null;
  const participants = Array.isArray(event?.participants) ? event.participants : [];
  const isOwner = !!currentUid && event?.ownerId === currentUid;
  const isParticipant = !!currentUid && (participants.includes(currentUid) || isOwner);
  const [participantsProfiles, setParticipantsProfiles] = useState({});
  const [plusOneByUid, setPlusOneByUid] = useState({});
  const [myPlusOne, setMyPlusOne] = useState(false);

  const [messages, setMessages] = useState([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [isShareOpen, setShareOpen] = useState(false);
  const [savedInviteId, setSavedInviteId] = useState(null);

  const bgSource = useMemo(() => {
    const id = event?.templateId ?? "party";
    return TEMPLATE_BACKGROUNDS[id] || TEMPLATE_BACKGROUNDS.party;
  }, [event?.templateId]);

  const fontFamily = event?.fontFamily || "Anta";
  const baseFontSize = fontFamily === "Tangerine" ? 25 : fontFamily === "Caveat" ? 19 : 12;

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
    if (!eventId) return;
  
    const ref = collection(db, "events", eventId, "attendees");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const next = {};
        snap.forEach((d) => {
          const data = d.data() || {};
          next[d.id] = !!data.plusOne;
        });
        setPlusOneByUid(next);
      },
      (err) => {
        console.error("attendees onSnapshot error:", err);
        setPlusOneByUid({});
      }
    );
  
    return () => unsub();
  }, [eventId]);

  useEffect(() => {
    if (!eventId || !currentUid) return;
  
    const ref = doc(db, "events", eventId, "attendees", currentUid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        const data = snap.exists() ? snap.data() : {};
        setMyPlusOne(!!data?.plusOne);
      },
      (err) => console.error("my attendee onSnapshot error:", err)
    );
  
    return () => unsub();
  }, [eventId, currentUid]);

  useEffect(() => {
    if (!eventId) return;
  
    if (!isParticipant) {
      setMessages([]);
      return;
    }
  
    const q = query(
      collection(db, "events", eventId, "messages"),
      orderBy("createdAt", "desc"),
      limit(60)
    );
  
    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = [];
        snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
        setMessages(list);
      },
      (err) => {
        console.error("messages onSnapshot error:", err);
        setMessages([]);
      }
    );
  
    return () => unsub();
  }, [eventId, isParticipant]);

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

  const handleTogglePlusOne = async () => {
    try {
      if (!eventId || !currentUid) return;
  
      const next = !myPlusOne;

      await setDoc(
        doc(db, "events", eventId, "attendees", currentUid),
        {
          plusOne: next,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (e) {
      console.error("toggle +1 error:", e);
      alert("Could not update +1. Please try again.");
    }
  };

  const plusOneCount = useMemo(() => {
    return Object.values(plusOneByUid).filter(Boolean).length;
  }, [plusOneByUid]);
  const participantsDisplayCount = participants.length + plusOneCount;

  const handleSendMessage = async () => {
    try {
      const text = (draftMessage || "").trim();
      if (!text) return;
  
      if (!eventId || !currentUid) {
        alert("You must be logged in to send messages.");
        return;
      }
  
      if (!isParticipant) {
        alert("You are not allowed to chat in this event.");
        return;
      }
  
      if (sending) return;
      setSending(true);
  
      const meProfile = participantsProfiles?.[currentUid];
      const senderName =
        meProfile?.displayName ||
        auth.currentUser?.displayName ||
        event?.username ||
        "User";
  
      const senderPhotoURL = meProfile?.photoURL || auth.currentUser?.photoURL || "";
  
      await addDoc(collection(db, "events", eventId, "messages"), {
        text,
        senderId: currentUid,
        senderName,
        senderPhotoURL,
        createdAt: serverTimestamp(),
      });
  
      setDraftMessage("");
    } catch (e) {
      console.error("handleSendMessage error:", e);
      alert("Could not send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

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

  const handleLeave = () => {
    Alert.alert(
      "Leave event",
      "This will permanently remove you from the event. Continue?",
      [
        { text: "Cancle", style: "cancle" },
        {
          text: "Leave",
          style:"destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user || ! eventId) return;

              const uid = user.uid;

              // 1) remove from participants
              await updateDoc(doc(db, "events", eventId), {
                participants: arrayRemove(uid),
                updatedAt: serverTimestamp(),
              });

              // 2) delete attendee doc (ignore if missing)
              try {
                await deleteDoc(doc(db, "events", eventId, "attendees", uid));
              } catch (_) {}

              goToTab("Home");
            } catch (e) {
              console.error("handleLeave error:", e);
              Alert.alert("Leave failed", e?.message ?? "Unknown error");
            }
          },
        },
      ]
    );
  };

  const handleDeleteEvent = () => {
    Alert.alert(
      "Delete event",
      "This will permanently delete the event. Continue?",
      [
        { text: "Cancle", style: "cancle" },
        {
          text: "Delete",
          style:"destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user || ! eventId) return;

              if (event?.ownerId !== user.uid) {
                Alert.alert("Permission denied", "Only the event owner can delete this event.");
                return;
              }

              // 1) Invite lekérése az eventhez
              const invitesQ = query(
                collection(db, "invites"),
                where("eventId", "==", eventId)
              );
              const invitesSnap = await getDocs(invitesQ);

              // 2) Invite törlése
              for (const d of invitesSnap.docs) {
                await deleteDoc(d.ref);
              }

              // 3) Event törlése
              await deleteDoc(doc(db, "events", eventId));

              goToTab("Home");
            } catch (e) {
              console.error("handleLeave error:", e);
              Alert.alert("Delete failed", e?.message ?? "Unknown error");
            }
          },
        },
      ]
    );
  }

  const handleKickParticipant = (targetUid) => {
    if (!isOwner) return;
    if (!eventId) return;
  
    // extra védelem: owner ne tudja magát / ownerId-t kickelni
    if (targetUid === currentUid || targetUid === event?.ownerId) return;
  
    const name = participantsProfiles?.[targetUid]?.displayName || "this user";
  
    Alert.alert(
      "Remove participant",
      `This will remove ${name} from the event. Continue?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Kick",
          style: "destructive",
          onPress: async () => {
            try {
              // 1) kiveszi a participants listából
              await updateDoc(doc(db, "events", eventId), {
                participants: arrayRemove(targetUid),
                updatedAt: serverTimestamp(),
              });
  
              // 2) törli az attendee docot (+1 reset)
              try {
                await deleteDoc(doc(db, "events", eventId, "attendees", targetUid));
              } catch (_) {}
            } catch (e) {
              console.error("handleKickParticipant error:", e);
              Alert.alert("Kick failed", e?.message ?? "Unknown error");
            }
          },
        },
      ]
    );
  };

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
              {/* EVENT TITLE */}
              <View>
                <Text
                  style={[styles.eventTitle, { fontFamily, fontSize: baseFontSize + 15 }]}
                >
                  {event?.title}
                </Text>
              </View>

              {/* DATE + OWNER */}
              <View style={styles.primaryActionsRow}>
                <Text
                  style={[styles.eventDate, { fontFamily, fontSize: baseFontSize }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {startAtLabel}
                </Text>
                <Text
                  style={[styles.eventOwner, { fontFamily, fontSize: baseFontSize }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {event?.username}
                </Text>
              </View>

              {/* EVENT DESCRIPTION */}
              <ScrollView
                style={styles.eventDescriptionScroll}
                contentContainerStyle={styles.eventDescriptionContent}
                showsVerticalScrollIndicator={false}
              >
                <View>
                  <Text
                    style={[
                      styles.eventDescription,
                      { fontFamily, fontSize: baseFontSize + 6 },
                    ]}
                  >
                    {event?.description}
                  </Text>
                </View>
              </ScrollView>
            </View>
  
            {/* BODY */}
            <View style={[styles.bodySection, styles.eventCardOverlay]}>

              {/* PARTICIPANTS */}
              <View style={[styles.box, styles.participantsBox]}>
                <Text style={[styles.boxTitle, { fontFamily, fontSize: baseFontSize + 2 }]}>
                  Participants - ({participantsDisplayCount})
                </Text>                
                <Text style={[styles.boxDesc, { fontFamily}]}>
                  Click on "+1" if you wanna bring someone with you
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
                        const hasPlusOne = !!plusOneByUid[uid];
                        const isMe = uid === currentUid;
                      
                        return (
                          <View key={uid} style={styles.participantRow}>
                            <View style={styles.participantRowInner}>
                              <Image
                                source={
                                  photoURL
                                    ? { uri: photoURL }
                                    : require("../../assets/pictures/base_prof_pic.jpg")
                                }
                                style={styles.participantAvatar}
                              />
                              <Text
                                style={[styles.participantText, { fontFamily, fontSize: baseFontSize }]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                              >
                                {name}
                              </Text>
                      
                              {/* +1 badge */}
                              {hasPlusOne && (
                                <View style={styles.plusOneBadge}>
                                  <Text style={[styles.plusOneBadgeText, { fontFamily }]}>+1</Text>
                                </View>
                              )}
                      
                              {/* +1 toggle */}
                              {isMe && (
                                <TouchableOpacity
                                  onPress={handleTogglePlusOne}
                                  style={[
                                    styles.plusOneToggle,
                                    myPlusOne && styles.plusOneToggleOn,
                                  ]}
                                  activeOpacity={0.85}
                                >
                                  <Text style={[styles.plusOneToggleText, { fontFamily }]}>
                                    +1
                                  </Text>
                                </TouchableOpacity>
                              )}

                              {/* Kick (owner only) */}
                              {isOwner && uid !== currentUid && uid !== event?.ownerId && (
                                <TouchableOpacity
                                  onPress={() => handleKickParticipant(uid)}
                                  style={[styles.kickBtn]}
                                  activeOpacity={0.85}
                                >
                                  <Text style={[styles.kickBtnText, { fontFamily }]}>Kick</Text>
                                </TouchableOpacity>
                              )}
                              
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
                  <View style={styles.chatInner}>
                    {/* Messages */}
                    <ScrollView
                      style={styles.chatList}
                      contentContainerStyle={styles.chatListContent}
                      keyboardShouldPersistTaps="handled"
                      showsVerticalScrollIndicator
                    >
                      {[...messages].reverse().map((item) => {
                        const isMeMsg = item?.senderId === currentUid;
                        const name = item?.senderName || "User";
                        const text = item?.text || "";

                        return (
                          <View
                            key={item.id}
                            style={[styles.msgRow, isMeMsg ? styles.msgRowMe : styles.msgRowOther]}
                          >
                            {!isMeMsg && (
                              <Text style={[styles.msgMeta, { fontFamily }]} numberOfLines={1}>
                                {name}
                              </Text>
                            )}

                            <View style={[styles.msgBubble, isMeMsg ? styles.msgBubbleMe : styles.msgBubbleOther]}>
                              <Text style={[styles.msgText, { fontFamily }]}>{text}</Text>
                            </View>
                          </View>
                        );
                      })}
                    </ScrollView>

                    {/* Input */}
                    <KeyboardAvoidingView
                      behavior={Platform.OS === "ios" ? "padding" : undefined}
                      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                    >
                      <View style={styles.chatInputRow}>
                        <TextInput
                          value={draftMessage}
                          onChangeText={setDraftMessage}
                          placeholder="Type a message…"
                          placeholderTextColor="rgba(255,255,255,0.6)"
                          style={[styles.chatInput, { fontFamily }]}
                          multiline
                          maxLength={800}
                        />

                        <TouchableOpacity
                          onPress={handleSendMessage}
                          style={[styles.sendBtn, sending && styles.sendBtnDisabled]}
                          activeOpacity={0.85}
                          disabled={sending}
                        >
                          <Text style={[styles.sendBtnText, { fontFamily }]}>
                            {sending ? "…" : "Send"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </KeyboardAvoidingView>
                  </View>
              </View>
  
              {/* MAP */}
              <TouchableOpacity 
                style={[styles.actionButton, {width: "100%"}]} 
                onPress={() => openMapForAddress(event?.location)}
              >
                <Text style={[styles.actionButtonText, { fontFamily, fontSize: baseFontSize }]}>
                  {event?.location}
                </Text>
              </TouchableOpacity>

              <View style={styles.secondaryActionRow}>  
                {/* SHARE */}
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

                {/* DELETE EVENT */}
                {isOwner && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.dangerButton]}
                    onPress={handleDeleteEvent}
                  >
                    <Text style={[styles.actionButtonText, { fontFamily, fontSize: baseFontSize }]}>
                      Delete event
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* LEAVE */}
              {!isOwner && (
                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerButton]}
                  onPress={handleLeave}
                >
                  <Text style={[styles.actionButtonText, { fontFamily, fontSize: baseFontSize }]}>
                    Leave event
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
