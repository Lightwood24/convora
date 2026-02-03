import { StyleSheet } from "react-native";
import theme from "./Theme";

export default StyleSheet.create({
  // == LAYOUT ==
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  // == SECTIONS ==
  headerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
    marginBottom: -150,
  },
  bodySection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  footerSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.secondaryBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderMuted,
    paddingBottom: 100,
  },

  // == HEADER ==
  header: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  screenTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },

  // == CALENDAR CARD ==
  calendarCard: {
    width: "100%",
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.backgroundOpaque35,
    borderWidth: 1,
    borderColor: theme.colors.borderWhite,
    padding: theme.spacing.md,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
  },
  monthTitle: {
    flex: 1,
    textAlign: "center",
    color: theme.colors.textPrimary,
    ...theme.typography.h2,
    marginHorizontal: theme.spacing.sm,
  },
  monthNavBtn: {
    width: 40,
    height: 36,
    borderRadius: theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.backgroundOpaque55,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  monthNavText: {
    color: theme.colors.textPrimary,
    fontSize: 22,
    fontFamily: "Anta",
    lineHeight: 22,
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.sm,
    paddingHorizontal: 2,
  },
  dayName: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: theme.colors.textMuted,
    ...theme.typography.small,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    padding: 4,
  },
  dayCellOut: {
    opacity: 0.45,
  },
  dayNum: {
    flex: 1,
    borderRadius: theme.radius.md,
    textAlign: "center",
    textAlignVertical: "center",
    color: theme.colors.textPrimary,
    fontFamily: "Anta",
    fontSize: 14,
    backgroundColor: theme.colors.backgroundOpaque25,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  dayNumOut: {
    color: theme.colors.textMuted,
  },
  dayNumToday: {
    borderColor: theme.colors.navigation,
    backgroundColor: theme.colors.backgroundOpaque55,
  },

  // == INPUT / BUTTONS ==
  actionsRow: {
    width: "86%",
    flexDirection: "row",
    columnGap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    alignSelf: "center",
  },
  button: {
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  actionBtn: {
    flex: 1,
  },
  naviButton: {
    backgroundColor: theme.colors.navigation,
  },
  naviButtonText: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
    fontFamily: "Anta",
  },
});
