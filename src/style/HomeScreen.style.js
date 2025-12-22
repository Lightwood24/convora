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
  },
  bodySection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: theme.spacing.lg,
  },
  footerSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 101,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: theme.colors.secondaryBackground,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderMuted,
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
    marginBottom: -150,
    textAlign: "center",
  },

  // == BODY ==
  sectionTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
  },
  eventsListContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: theme.spacing.sm,
    height: 400,
  },
  eventsList: {
    width: "86%",
  },
  eventsListContent: {
    paddingBottom: theme.spacing.md,
  },

  eventCard: {
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    overflow: "hidden",
    height: 120,
  },
  eventCardImage: {
    borderRadius: theme.radius.lg,
    resizeMode: "cover",
  },
  eventCardOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    justifyContent: "center",
  },
  eventTitle: {
    ...theme.typography.base,
    color: theme.colors.textPrimary,
  },
  eventDate: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  eventDescription: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  fadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 10,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
  },
  fadeBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 10,
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
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
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
    fontFamily: "Anta",
  },
  newEventButton: {
    width: "60%",
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.lg,
    ...theme.shadows.card,
  },
  newEventButtonText: {
    ...theme.typography.base,
    color: theme.colors.textPrimary,
    fontFamily: "Anta",
    fontWeight: "600",
  },
});
