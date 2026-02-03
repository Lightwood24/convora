import React, { useMemo, useState } from "react";
import {Text, ScrollView, View, TouchableOpacity, ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import background from  "../../assets/pictures/background.jpg"
import styles from "../style/CalendarScreen.style";

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

export default function CalendarScreen() {
  const navigation = useNavigation();

  // Cursor - a jelenlegi hónap
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const goPrev = () => {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goNext = () => {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const monthTitle = useMemo(() => formatMonthTitle(cursor), [cursor]);

  // 42 cell (6 weeks) grid
  const grid = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = endOfMonth(cursor);

    // gridStart
    const startOffset = mondayIndex(start.getDay());
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - startOffset);

    const cells = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);

      const inMonth = d.getMonth() === cursor.getMonth();
      cells.push({ key: `${d.toISOString()}`, date: d, inMonth });
    }

    return { start, end, cells };
  }, [cursor]);

  const today = useMemo(() => new Date(), []);

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
              <Text style={styles.screenTitle}>Calendar</Text>
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
              <View style={styles.grid}>
                {grid.cells.map((cell) => {
                  const isToday = sameDay(cell.date, today);

                  return (
                    <View
                      key={cell.key}
                      style={[
                        styles.dayCell,
                        !cell.inMonth && styles.dayCellOut,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayNum,
                          !cell.inMonth && styles.dayNumOut,
                          isToday && styles.dayNumToday,
                        ]}
                      >
                        {cell.date.getDate()}
                      </Text>
                    </View>
                  );
                })}
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