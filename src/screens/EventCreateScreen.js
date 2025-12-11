import React, { useState, useEffect } from "react";
import { Text, TextInput, View, TouchableOpacity, ImageBackground, } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/EventCreateScreen.style";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { auth, db } from "../services/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp, } from "firebase/firestore";

const TEMPLATE_OPTIONS = [
  {
    id: "grim",
    label: "Grim card",
    image: require("../../assets/pictures/grim_card.png"),
  },
  {
    id: "love",
    label: "Love card",
    image: require("../../assets/pictures/love_card.png"),
  },
  {
    id: "nature",
    label: "Nature card",
    image: require("../../assets/pictures/nature_card.png"),
  },
  {
    id: "office",
    label: "Office card",
    image: require("../../assets/pictures/office_card.png"),
  },
  {
    id: "party",
    label: "Party card",
    image: require("../../assets/pictures/party_card.png"),
  },
  {
    id: "theatre",
    label: "Theatre card",
    image: require("../../assets/pictures/theatre_card.png"),
  },
];

const TEMPLATE_FONTS = {
  grim: "Cinzel",
  love: "Tangerine",
  nature: "Merienda",
  office: "Caveat",
  theatre: "Monoton",
  party: "Bitcount",
};

export default function EventCreateScreen() {
  const navigation = useNavigation();

  const [selectedTemplateId, setSelectedTemplateId] = useState("party");
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventUser, setEventUser] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventAddress, setEventAddress] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const goToTab = (tabName) => {
    navigation.navigate("AppTabs", { screen: tabName });
  };

  const selectedTemplate =
    TEMPLATE_OPTIONS.find((t) => t.id === selectedTemplateId) ||
    TEMPLATE_OPTIONS[0];

  const selectedBg = selectedTemplate.image;
  const cardFontFamily = TEMPLATE_FONTS[selectedTemplateId] || "Anta";

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

  useEffect(() => {
    const loadUsername = async () => {
      const user = auth.currentUser;
      if (!user) return;

      let username = user.displayName || "";

      try {
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          if (data.displayName) {
            username = data.displayName;
          }
        }
      } catch (err) {
        console.warn("Failed to load username from Firestore", err);
      }

      if (username) {
        setEventUser(username);
      }
    };

    loadUsername();
  }, []);

  // city, street, number
  const validateAddress = (address) => {
    const regex =
      /^[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű\s.-]+,\s*[A-ZÁÉÍÓÖŐÚÜŰa-záéíóöőúüű0-9\s.-]+,\s*\d+[A-Za-z]?$/;
    return regex.test(address.trim());
  };

  const isRequiredFilled = (value) =>
    value !== null && value !== undefined && value.toString().trim().length > 0;

  const validateForm = () => {
    const errors = [];

    if (!isRequiredFilled(eventTitle)) {
      errors.push("Event name is required.");
    }

    if (!isRequiredFilled(eventUser)) {
      errors.push("Username is required.");
    }

    if (!isRequiredFilled(eventDate)) {
      errors.push("Date is required.");
    }

    if (!isRequiredFilled(eventTime)) {
      errors.push("Time is required.");
    }

    if (!isRequiredFilled(eventAddress)) {
      errors.push("Location is required (city, street, number).");
    } else if (!validateAddress(eventAddress)) {
      errors.push("Invalid address. Use: city, street, number.");
    }

    if (errors.length > 0) {
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
  };

  const handleDiscard = () => {
    resetForm();
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to save an event.");
      return;
    }

    try {
      const startAt = new Date(`${eventDate}T${eventTime}:00`);

      const eventsCol = collection(db, "events");

      const docRef = await addDoc(eventsCol, {
        title: eventTitle.trim(),
        description: eventDescription.trim(),
        location: eventAddress.trim(),
        ownerId: user.uid,
        username: eventUser.trim(),
        startAt,
        templateId: selectedTemplateId,
        fontFamily: cardFontFamily,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log("Event created with ID:", docRef.id);
      alert("Event saved.");

      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Could not save event. Please try again.");
    }
  };

  const handleShare = async () => {
    if (!validateForm()) return;
    // TODO
    alert("Share action not implemented yet.");
  };

  const renderCardForm = () => (
    <View style={styles.cardInnerContent}>
      <View style={styles.topRow}>
        {/* date */}
        <View style={[styles.dateBox]}>
          <TouchableOpacity
            onPress={showDatePicker}
            style={[styles.cardInput, styles.dateInput]}
          >
            <Text
              style={{
                color: eventDate ? "white" : "rgba(245,245,245,0.75)",
                fontFamily: cardFontFamily,
                fontSize: cardFontFamily === "Tangerine" ? 24 : 15,
              }}
            >
              {eventDate || "Date"}
            </Text>

            <Text
              style={{
                color: eventTime ? "white" : "rgba(245,245,245,0.75)",
                fontFamily: cardFontFamily,
                fontSize: cardFontFamily === "Tangerine" ? 24 : 15,
              }}
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
              placeholderTextColor="rgba(245,245,245,0.75)"
              style={[
                styles.cardInput,
                styles.titleInput,
                {
                  fontFamily: cardFontFamily,
                  fontSize: cardFontFamily === "Tangerine" ? 24 : 15,
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
              placeholderTextColor="rgba(245,245,245,0.75)"
              style={[
                styles.cardInput,
                styles.usernameInput,
                {
                  fontFamily: cardFontFamily,
                  fontSize: cardFontFamily === "Tangerine" ? 24 : 15,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* description (optional) */}
      <View style={styles.descriptionBox}>
        <TextInput
          value={eventDescription}
          onChangeText={setEventDescription}
          placeholder="Event description"
          placeholderTextColor="rgba(245,245,245,0.75)"
          multiline
          style={[
            styles.cardInput,
            styles.descriptionInput,
            {
              fontFamily: cardFontFamily,
              fontSize: cardFontFamily === "Tangerine" ? 24 : 15,
            },
          ]}
        />
      </View>

      {/* address / map */}
      <View style={styles.addressBox}>
        <TextInput
          value={eventAddress}
          onChangeText={setEventAddress}
          placeholder="Location (city, street, number)"
          placeholderTextColor="rgba(245,245,245,0.75)"
          style={[
            styles.cardInput,
            styles.addressInput,
            {
              fontFamily: cardFontFamily,
              fontSize: cardFontFamily === "Tangerine" ? 24 : 15,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
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
                <Text style={styles.templateText}>
                  {selectedTemplate ? selectedTemplate.label : "Templates"}
                </Text>
                <Text style={styles.templateChevron}>
                  {templatesOpen ? "▴" : "▾"}
                </Text>
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
                          tpl.id === selectedTemplateId &&
                            styles.templateItemSelected,
                        ]}
                        onPress={() => handleSelectTemplate(tpl.id)}
                        activeOpacity={0.9}
                      >
                        <Text
                          style={[
                            styles.templateItemText,
                            tpl.id === selectedTemplateId &&
                              styles.templateItemTextSelected,
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

            {selectedBg ? (
              <ImageBackground
                source={selectedBg}
                style={styles.cardInnerBg}
                imageStyle={styles.cardInnerBgImage}
              >
                <View style={styles.cardInnerOverlay}>{renderCardForm()}</View>
              </ImageBackground>
            ) : (
              <View style={styles.cardInner}>{renderCardForm()}</View>
            )}
          </View>

          {/* ACTION ROW */}
          <View style={styles.primaryActionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.discardButton]}
              onPress={handleDiscard}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.saveAsDraftButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save as Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.shareButton]}
              onPress={handleShare}
            >
              <Text style={styles.buttonText}>Share</Text>
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
  );
}
