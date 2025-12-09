import { StyleSheet } from "react-native";
import theme from "./Theme";

export default StyleSheet.create({
  // == LAYOUT ==
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    width: "100%",
  },

  // == SECTIONS ==
  headerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
    
  },
  bodySection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingBottom: 90,
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
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  screenTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },

  // == EVENT LIST / CARDS ==
  eventList: {
    width: "86%",
    marginTop: theme.spacing.md,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
    overflow: "hidden",
  },
  dateColumn: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: theme.colors.borderMuted,
    backgroundColor: theme.colors.surfaceElevated,
  },
  dateBox: {
    width: 56,
    height: 56,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },
  eventContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    justifyContent: "center",
  },
  eventTitle: {
    ...theme.typography.base,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  eventSnippet: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
  },

  // == BUTTONS ==
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
  buttonNavi: {
    backgroundColor: theme.colors.navigation,
  },
  newEventButton: {
    width: "60%",
    alignSelf: "center",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
    fontFamily: "Anta",
  },
});
