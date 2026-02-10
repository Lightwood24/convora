import React, { useEffect, useMemo, useState, useRef } from "react";
import { Text, TextInput, View, TouchableOpacity, ImageBackground } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ViewShot from "react-native-view-shot";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, getDoc, collection, addDoc, updateDoc, serverTimestamp, Timestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../services/firebase";
import background from "../../assets/pictures/background.jpg";
import styles from "../style/EventCreateScreen.style";
import ShareDialog from "./ShareDialog";

const TEMPLATE_OPTIONS = [
  { id: "grim", label: "Grim card", image: require("../../assets/pictures/grim_card.png"), font: "Cinzel" },
  { id: "love", label: "Love card", image: require("../../assets/pictures/love_card.png"), font: "Tangerine" },
  { id: "nature", label: "Nature card", image: require("../../assets/pictures/nature_card.png"), font: "Merienda" },
  { id: "office", label: "Office card", image: require("../../assets/pictures/office_card.png"), font: "Caveat" },
  { id: "party", label: "Party card", image: require("../../assets/pictures/party_card.png"), font: "Bitcount" },
  { id: "theatre", label: "Theatre card", image: require("../../assets/pictures/theatre_card.png"), font: "Monoton" },
];

const PLACEHOLDER_COLOR = "white";

export default function EventCreateScreen() {
  const navigation = useNavigation();
  const goToTab = (tabName) => navigation.navigate("AppTabs", { screen: tabName });

  const [selectedTemplateId, setSelectedTemplateId] = useState("party");
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventUser, setEventUser] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventAddress, setEventAddress] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isShareOpen, setShareOpen] = useState(false);
  const [savedInviteId, setSavedInviteId] = useState(null);

  const cardShotRef = useRef(null);

  const selectedTemplate = useMemo(() => {
    return TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplateId) ?? TEMPLATE_OPTIONS[0];
  }, [selectedTemplateId]);

  const selectedBg = selectedTemplate.image;
  const cardFontFamily = selectedTemplate.font || "Anta";

  // FÜGGVÉNYEK
  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
    setTemplatesOpen(false);
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const d = new Date(date);

    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const timeStr = `${hours}:${minutes}`;

    setEventDate(dateStr);
    setEventTime(timeStr);
    hideDatePicker();
  };

  const uploadInviteImageAndGetUrl = async ({ inviteId }) => {
    if (!cardShotRef.current) throw new Error("cardShotRef not ready");
  
    // local fájl uri
    const uri = await cardShotRef.current.capture();
  
    // convert to blob
    const resp = await fetch(uri);
    const blob = await resp.blob();
  
    // feltöltés a Storage-ba
    const path = `invites/${inviteId}/invite.jpg`;
    const fileRef = storageRef(storage, path);
  
    await uploadBytes(fileRef, blob, { contentType: "image/jpeg" });
  
    // URL letöltése
    const url = await getDownloadURL(fileRef);
    return url;
  };

  // ADATBÁZIS
  useEffect(() => {
    const loadUsername = async () => {
      const user = auth.currentUser;

      let username = user.displayName;

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          if (data?.displayName) username = data.displayName;
        }
      } catch (err) {
        console.warn("Failed to load username from Firestore", err);
      }

      if (username) setEventUser(username);
    };

    loadUsername();
  }, []);

  // == VALIDÁTOROK ==
  const validateAddress = (address) => {
    const regex =
      /^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\s.-]+,\s*[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű0-9\s.-]+,\s*\d+[A-Za-z]?$/;
    return regex.test(address.trim());
  };

  const isRequiredFilled = (value) =>
    value !== null && value !== undefined && value.toString().trim().length > 0;

  const validateForm = () => {
    const errors = [];

    if (!isRequiredFilled(eventTitle)) errors.push("Event name is required.");
    if (!isRequiredFilled(eventUser)) errors.push("Username is required.");
    if (!isRequiredFilled(eventDate)) errors.push("Date is required.");
    if (!isRequiredFilled(eventTime)) errors.push("Time is required.");

    if (!isRequiredFilled(eventAddress)) {
      errors.push("Location is required (city, street, number).");
    } else if (!validateAddress(eventAddress)) {
      errors.push("Invalid address. Use: city, street, number.");
    }

    if (errors.length) {
      alert(errors.join("\n"));
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setSelectedTemplateId("party");
    setTemplatesOpen(false);
    setEventDate("");
    setEventTime("");
    setEventTitle("");
    setEventDescription("");
    setEventAddress("");
    setSavedInviteId(null);
  };

  // == ACTION ROW GOMBOK ==
  const handleDiscard = () => {
    resetForm();
    goToTab("Home");
  };

  const handleSaveAndShare = async () => {
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to save an event.");
      return;
    }

    try {
      const startAt = new Date(`${eventDate}T${eventTime}:00`);
  
      // event mezők
      const eventRef = await addDoc(collection(db, "events"), {
        title: eventTitle.trim(),
        description: eventDescription.trim(),
        location: eventAddress.trim(),
        ownerId: user.uid,
        username: eventUser.trim(),
        startAt,
        templateId: selectedTemplateId,
        fontFamily: cardFontFamily,
        participants: [user.uid],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
  
      const eventId = eventRef.id;

      // attendee subcollection
      await setDoc(
        doc(db, "events", eventId, "attendees", user.uid),
        {
          plusOne: false,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
  
      // invite mezők
      const expiresAt = Timestamp.fromDate(new Date(Date.now() + 48 * 60 * 60 * 1000));
      const inviteRef = await addDoc(collection(db, "invites"), {
        eventId,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        expiresAt,
        imageUrl: null,
      });
  
      const inviteId = inviteRef.id;
  
      // generate + upload meghívó
      const imageUrl = await uploadInviteImageAndGetUrl({ inviteId });
  
      // meghívó elmentése
      await updateDoc(doc(db, "invites", inviteId), { imageUrl });

      // share dialog megnyitása
      setSavedInviteId(inviteId);
      setShareOpen(true);
    } catch (error) {
      console.error("Error saving event/invite:", error);
      alert("Could not save event. Please try again.");
    }
  };

  // EVENT KÁRTYA
  const renderCardForm = () => (
    <View style={styles.cardContent}>
      <View style={styles.topRow}>
        {/* date */}
        <View style={styles.dateBox}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text
              style={[
                styles.cardInput,
                {
                  fontFamily: cardFontFamily,
                  fontSize: cardFontFamily === "Tangerine" || cardFontFamily === "Caveat" ? 24 : 15,
                },
              ]}
            >
              {eventDate || "Date"}
            </Text>
            <Text
              style={[
                styles.cardInput,
                {
                  fontFamily: cardFontFamily,
                  fontSize: cardFontFamily === "Tangerine" || cardFontFamily === "Caveat" ? 24 : 15,
                },
              ]}
            >
              {eventTime || "Time"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <View style={styles.titleColumn}>

          {/* event name */}
          <View style={styles.inputLargeWrapper}>
            <TextInput
              value={eventTitle}
              onChangeText={setEventTitle}
              placeholder="Event name"
              placeholderTextColor={PLACEHOLDER_COLOR}
              style={[
                styles.cardInput,
                {
                  fontFamily: cardFontFamily,
                  fontSize: cardFontFamily === "Tangerine" || cardFontFamily === "Caveat" ? 24 : 15,
                },
              ]}
            />
          </View>

          {/* username */}
          <View style={styles.inputSmallWrapper}>
            <TextInput
              value={eventUser}
              editable={false}
              selectTextOnFocus={false}
              placeholder="Username"
              placeholderTextColor={PLACEHOLDER_COLOR}
              style={[
                styles.cardInput,
                {
                  fontFamily: cardFontFamily,
                  fontSize: cardFontFamily === "Tangerine" || cardFontFamily === "Caveat" ? 24 : 15,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* description */}
      <View style={styles.descriptionBox}>
        <TextInput
          value={eventDescription}
          onChangeText={setEventDescription}
          placeholder="Event description"
          placeholderTextColor={PLACEHOLDER_COLOR}
          multiline
          style={[
            styles.cardInput,
            {
              fontFamily: cardFontFamily,
              fontSize: cardFontFamily === "Tangerine" || cardFontFamily === "Caveat" ? 24 : 15,
            },
          ]}
        />
      </View>

      {/* address */}
      <View style={styles.addressBox}>
        <TextInput
          value={eventAddress}
          onChangeText={setEventAddress}
          placeholder="Location (city, street, number)"
          placeholderTextColor={PLACEHOLDER_COLOR}
          style={[
            styles.cardInput,
            {
              fontFamily: cardFontFamily,
              fontSize: cardFontFamily === "Tangerine" || cardFontFamily === "Caveat" ? 24 : 15,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={styles.container}
      >
        <View style={styles.content}>

          {/* HEADER */}
          <View style={styles.headerSection}>
            <View style={styles.header}>
              <Text style={styles.screenTitle}>Plan your event</Text>
            </View>
          </View>

          {/* BODY */}
          <View style={styles.bodySection}>
            {/* INVITE CARD */}
            <View style={styles.card}>
              <View style={styles.templateContainer}>
                <TouchableOpacity
                  style={styles.templateBar}
                  onPress={() => setTemplatesOpen((prev) => !prev)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.templateText}>{selectedTemplate.label}</Text>
                  <Text style={styles.templateChevron}>{templatesOpen ? "▴" : "▾"}</Text>
                </TouchableOpacity>

                {templatesOpen && (
                  <View style={styles.templateListOverlay}>
                    <KeyboardAwareScrollView
                      style={styles.templateListScroll}
                      contentContainerStyle={styles.templateList}
                      showsVerticalScrollIndicator={false}
                    >
                      {TEMPLATE_OPTIONS.map((tpl) => (
                        <TouchableOpacity
                          key={tpl.id}
                          style={[
                            styles.templateItem,
                            tpl.id === selectedTemplateId && styles.templateItemSelected,
                          ]}
                          onPress={() => handleSelectTemplate(tpl.id)}
                          activeOpacity={0.9}
                        >
                          <Text
                            style={[
                              styles.templateItemText,
                              tpl.id === selectedTemplateId && styles.templateItemTextSelected,
                            ]}
                          >
                            {tpl.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </KeyboardAwareScrollView>
                  </View>
                )}
              </View>

              <ViewShot
                ref={cardShotRef}
                options={{ format: "jpg", quality: 0.95 }}
              >
                <ImageBackground
                  source={selectedBg}
                  style={styles.cardBg}
                  imageStyle={styles.cardBgImage}
                >
                  <View style={styles.cardOverlay}>{renderCardForm()}</View>
                </ImageBackground>
              </ViewShot>
            </View>

            {/* ACTION ROW */}
            <View style={styles.primaryActionsRow}>
              <TouchableOpacity style={[styles.button, styles.discardButton]} onPress={handleDiscard}>
                <Text style={styles.buttonText}>Discard</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleSaveAndShare}>
                <Text style={styles.buttonText}>Save & Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FOOTER */}
          <View style={styles.footerSection}>
            <View style={styles.naviActionsRow}>
              <TouchableOpacity
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => goToTab("Profile")}
              >
                <Text style={styles.buttonText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => goToTab("Home")}
              >
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.naviButton, styles.actionBtn]}
                onPress={() => goToTab("Calendar")}
              >
                <Text style={styles.buttonText}>Calendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* SHARE DIALOG */}
      <ShareDialog
        visible={isShareOpen}
        onClose={() => {
          setShareOpen(false);
          goToTab("Home");
        }}
        title="Share your event"
        inviteId={savedInviteId}
      />
    </ImageBackground>
  );
}
