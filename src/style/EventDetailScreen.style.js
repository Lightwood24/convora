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
    flexGrow: 0,
    alignItems: "center",
    marginTop: 60,
  },
  bodySection: {
    flexGrow: 0,
    alignItems: "center",
    justifyContent: "flex-start",
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
    backgroundColor: theme.colors.backgroundOpaque55,
    padding: theme.spacing.xl,
    margin: theme.spacing.md,
    borderRadius: theme.radius.xxl,
    justifyContent: "center",
  },
  eventScrollContent: {
    paddingBottom: 120,
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
    height: "35%",
  },
  eventDescription: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.md,
    textAlign: "center",
  },
  primaryActionsRow: {
    width: "86%",
    flexDirection: "row",
    columnGap: 80,
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

  // == BODY ==
  box: {
    height: 150,
    width: "100%",
    backgroundColor: theme.colors.backgroundOpaque35,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderColor: theme.colors.borderWhite,
    borderWidth: 1,
  },
  participantsBox: {
    justifyContent: "space-between",
  },
  chatBox: {
    justifyContent: "flex-start",
  },
  boxTitle: {
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
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
  actionButton: {
    height: 44,
    width: "100%",
    borderRadius: theme.radius.md,
    borderColor: theme.colors.borderWhite,
    borderWidth: 1,
    backgroundColor: theme.colors.backgroundOpaque75,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.sm,
  },
  actionButtonText: {
    color: theme.colors.textPrimary,
  },  
  errorText: {
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
  },
  
});
