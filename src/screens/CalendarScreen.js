import React, { useEffect, useMemo, useState } from "react";
import { Text, ScrollView, View, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../services/firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import background from "../../assets/pictures/background.jpg";
import styles from "../style/CalendarScreen.style";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TEMPLATE_BACKGROUNDS = {
  grim: require("../../assets/pictures/grim_card.png"),
  love: require("../../assets/pictures/love_card.png"),
  nature: require("../../assets/pictures/nature_card.png"),
  office: require("../../assets/pictures/office_card.png"),
  party: require("../../assets/pictures/party_card.png"),
  theatre: require("../../assets/pictures/theatre_card.png"),
};

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Monday-based átalakitása Sunday-based-ra
function mondayIndex(jsDay) {
  return (jsDay + 6) % 7;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatMonthTitle(date) {
  const y = date.getFullYear();
  const m = date.toLocaleString("en-US", { month: "long" });
  return `${m} ${y}`;
}

function dayKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function toJsDate(maybeTs) {
  if (!maybeTs) return null;
  if (maybeTs?.toDate) return maybeTs.toDate();
  const d = new Date(maybeTs);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function CalendarScreen() {
  const navigation = useNavigation();

  const currentUid = auth.currentUser?.uid ?? null;

  // Cursor - a jelenlegi hónap
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [openWeekIndex, setOpenWeekIndex] = useState(null);

  // Events
  const [events, setEvents] = useState([]);

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

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setEvents(list);
      },
      (err) => {
        console.error("Calendar events onSnapshot error:", err);
        setEvents([]);
      }
    );

    return () => unsub();
  }, [currentUid]);

  const eventsByDay = useMemo(() => {
    const map = {};
    for (const ev of events) {
      const start = toJsDate(ev.startAt);
      if (!start) continue;

      const k = dayKey(start);
      if (!map[k]) map[k] = [];
      map[k].push(ev);
    }

    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => {
        const da = toJsDate(a.startAt)?.getTime?.() ?? 0;
        const dbb = toJsDate(b.startAt)?.getTime?.() ?? 0;
        return da - dbb;
      });
    });
    return map;
  }, [events]);

  const goPrev = () => {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDate(null);
    setOpenWeekIndex(null);
  };

  const goNext = () => {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDate(null);
    setOpenWeekIndex(null);
  };

  const monthTitle = useMemo(() => formatMonthTitle(cursor), [cursor]);

  const grid = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = endOfMonth(cursor);

    const startOffset = mondayIndex(start.getDay());
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - startOffset);

    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);

      const inMonth = d.getMonth() === cursor.getMonth();
      cells.push({ key: d.toISOString(), date: d, inMonth });
    }

    return { start, end, cells };
  }, [cursor]);

  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < 6; i++) w.push(grid.cells.slice(i * 7, i * 7 + 7));
    return w;
  }, [grid.cells]);

  const today = useMemo(() => new Date(), []);

  const onPressCell = (cell, weekIndex) => {
    setOpenWeekIndex((prevWeek) => {
      const isSame = selectedDate && sameDay(cell.date, selectedDate);

      if (isSame && prevWeek === weekIndex) {
        setSelectedDate(cell.date);
        return null;
      }

      setSelectedDate(cell.date);
      return weekIndex;
    });
  };

  const selectedKey = selectedDate ? dayKey(selectedDate) : null;
  const selectedEvents = selectedKey ? eventsByDay[selectedKey] || [] : [];

  return (
    <ImageBackground source={background} style={styles.background} resizeMode="cover">
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
              <Text style={styles.screenTitle}>Calendar Screen</Text>
            </View>
          </View>

          {/* BODY */}
          <View style={styles.bodySection}>
            <View style={styles.calendarCard}>
              {/* Month header */}
              <View style={styles.monthRow}>
                <TouchableOpacity style={styles.monthNavBtn} onPress={goPrev} activeOpacity={0.8}>
                  <Text style={styles.monthNavText}>‹</Text>
                </TouchableOpacity>

                <Text style={styles.monthTitle} numberOfLines={1} ellipsizeMode="tail">
                  {monthTitle}
                </Text>

                <TouchableOpacity style={styles.monthNavBtn} onPress={goNext} activeOpacity={0.8}>
                  <Text style={styles.monthNavText}>›</Text>
                </TouchableOpacity>
              </View>

              {/* Day names */}
              <View style={styles.dayNamesRow}>
                {DAY_NAMES.map((d) => (
                  <Text key={d} style={styles.dayName}>
                    {d}
                  </Text>
                ))}
              </View>

              {/* Grid */}
              <View>
                {weeks.map((weekCells, weekIndex) => (
                  <View key={`week-${weekIndex}`}>
                    {/* week row */}
                    <View style={styles.weekRow}>
                      {weekCells.map((cell) => {
                        const isToday = sameDay(cell.date, today);
                        const isSelected = selectedDate && sameDay(cell.date, selectedDate);

                        const k = dayKey(cell.date);
                        const dayEvents = eventsByDay[k] || [];
                        const firstEvent = dayEvents.length > 0 ? dayEvents[0] : null;

                        const bgSource =
                          firstEvent?.templateId && TEMPLATE_BACKGROUNDS[firstEvent.templateId]
                            ? TEMPLATE_BACKGROUNDS[firstEvent.templateId]
                            : null;

                        return (
                          <TouchableOpacity
                            key={cell.key}
                            style={[styles.dayCell, !cell.inMonth && styles.dayCellOut]}
                            activeOpacity={0.85}
                            onPress={() => onPressCell(cell, weekIndex)}
                          >
                            <View style={styles.dayCellInner}>
                              {bgSource ? (
                                <ImageBackground
                                  source={bgSource}
                                  style={styles.dayBg}
                                  imageStyle={styles.dayBgImage}
                                >
                                  <View style={styles.dayBgOverlay}>
                                    <Text
                                      style={[
                                        styles.dayNumOnImage,
                                        !cell.inMonth && styles.dayNumOut,
                                        isToday && styles.dayNumToday,
                                      ]}
                                    >
                                      {cell.date.getDate()}
                                    </Text>
                                  </View>
                                </ImageBackground>
                              ) : (
                                <Text
                                  style={[
                                    styles.dayNum,
                                    !cell.inMonth && styles.dayNumOut,
                                    isToday && styles.dayNumToday,
                                    isSelected && styles.dayNumSelected,
                                  ]}
                                >
                                  {cell.date.getDate()}
                                </Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* expandable row */}
                    {openWeekIndex === weekIndex && (
                      <View style={styles.expandedRow}>
                        <Text style={styles.expandedTitle}>
                          {selectedDate ? selectedDate.toDateString() : "Selected day"}
                        </Text>

                        {selectedEvents.length === 0 ? (
                          <Text style={styles.expandedHint}>(No events)</Text>
                        ) : (
                          <View style={styles.expandedEventsList}>
                            {selectedEvents.map((ev) => {
                              const bgSource = TEMPLATE_BACKGROUNDS[ev.templateId];

                              return (
                                <TouchableOpacity
                                  key={ev.id}
                                  activeOpacity={0.85}
                                  onPress={() => navigation.navigate("EventDetail", { eventId: ev.id })}
                                >
                                  <View>
                                    <ImageBackground
                                      source={bgSource}
                                      style={styles.expandedEventBg}
                                      imageStyle={styles.expandedEventBgImage}
                                    >
                                      <View style={styles.expandedEventBgOverlay}>
                                        <Text
                                          style={styles.expandedEventTitleOnBg}
                                          numberOfLines={1}
                                          ellipsizeMode="tail"
                                        >
                                          {ev.title || "Untitled event"}
                                        </Text>
                                      </View>
                                    </ImageBackground>
                                  </View>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
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
