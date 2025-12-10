import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../style/EventCreateScreen.style";

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

  const goToTab = (tabName) => {
    navigation.navigate("AppTabs", { screen: tabName });
  };

  const selectedTemplate = TEMPLATE_OPTIONS.find(
    (t) => t.id === selectedTemplateId
  );
  const selectedBg = selectedTemplate?.image;
  const currentFontFamily = TEMPLATE_FONTS[selectedTemplateId] ?? "Anta";

  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
    setTemplatesOpen(false);
  };

  const renderCardInnerMock = (fontFamily) => (
    <View style={styles.cardInnerContent}>
      <View style={styles.topRow}>
        <View style={styles.dateBox}>
          <Text style={[styles.dateText, { fontFamily }]}>
            Select{"\n"}Date
          </Text>
        </View>
  
        <View style={styles.titleColumn}>
          <View style={styles.inputMockLarge}>
            <Text style={[styles.inputMockText, { fontFamily }]}>
              Event Name
            </Text>
          </View>
          <View style={styles.inputMockSmall}>
            <Text style={[styles.inputMockText, { fontFamily }]}>
              Username
            </Text>
          </View>
        </View>
      </View>
  
      <View style={styles.descriptionBox}>
        <Text
          style={[styles.descriptionPlaceholder, { fontFamily }]}
        >
          Event Description
        </Text>
      </View>
  
      <View style={styles.addressBox}>
        <Text style={[styles.inputMockText, { fontFamily }]}>
          Address / Map
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Plan your event</Text>
          </View>
        </View>

        <View style={styles.bodySection}>
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
                  <ScrollView
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
                  </ScrollView>
                </View>
              )}
            </View>

            {selectedBg ? (
              <ImageBackground
                source={selectedBg}
                style={styles.cardInnerBg}
                imageStyle={styles.cardInnerBgImage}
              >
                <View style={styles.cardInnerOverlay}>
                  {renderCardInnerMock(currentFontFamily)}
                </View>
              </ImageBackground>
            ) : (
              <View style={styles.cardInner}>
                {renderCardInnerMock(currentFontFamily)}
              </View>
            )}
          </View>

          <View style={styles.primaryActionsRow}>
            <TouchableOpacity
              style={[styles.button, styles.discardButton]}
              onPress={() => {}}
            >
              <Text style={styles.buttonText}>Discard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.shareButton]}
              onPress={() => {}}
            >
              <Text style={styles.buttonText}>Share options</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    </ScrollView>
  );
}
