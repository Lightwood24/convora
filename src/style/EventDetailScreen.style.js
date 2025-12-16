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
    paddingHorizontal: theme.spacing.lg,
    alignItems: "center",
    flexGrow: 0,
    marginTop: 60,
  },
  bodySection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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

  // == HEADER + BODY ==
  eventCard: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  eventCardImage: {
    borderRadius: theme.radius.lg,
    resizeMode: "cover",
  },
  eventCardOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
    padding: theme.spacing.xl,
    margin: theme.spacing.md,
    borderRadius: theme.radius.xxl,
    justifyContent: "center",
  },

  // == HEADER ==
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  eventTitle: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    width: "100%",
    height: "30%",
  },
  eventDescription: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    textAlign: "center",
  },
  primaryActionsRow: {
    width: "86%",
    flexDirection: "row",
    columnGap: 120,
    alignSelf: "center",
  },
  eventDate: {
    color: theme.colors.textSecondary,
    paddingLeft: theme.spacing.md,
  },
  eventOwner: {
    color: theme.colors.textPrimary,
    paddingRight: theme.spacing.md,
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
  buttonNavi: {
    backgroundColor: theme.colors.navigation, 
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
    fontFamily: "Anta", 
  },

});
