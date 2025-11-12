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
    marginTop: 60,
    
  },
  bodySection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 150,
  },
  footerSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    alignItems: "center",
    justifyContent: "felx-start",
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
  subtitle: {
    color: theme.colors.textMuted,
    ...theme.typography.base,
    textAlign: "center",
    marginTop: theme.spacing.xs,
    marginRight: theme.spacing.lg,
    marginLeft: theme.spacing.lg,
  },

  // == CARD ==
  card: {
    width: "86%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
  },
  cardBody: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },

  // == AVATAR ==
  avatarBtn: { alignItems: "center", paddingTop: theme.spacing.lg },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  },
  avatarImg: { width: "100%", height: "100%", opacity: 0.85 },
  avatarPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4d4d4",
  },
  avatarIcon: { fontSize: 28, fontFamily: "Anta" }, 
  changePhotoText: {
    color: theme.colors.primaryMuted,
    marginTop: theme.spacing.sm,
  },

  // == INPUT / BUTTONS ==
  input: {
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.sm,
    height: 44,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    fontFamily: "Anta", 
  },
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
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonNavi: {
    backgroundColor: theme.colors.navigation, 
  },
  buttonDanger: {
    backgroundColor: theme.colors.danger,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
    fontFamily: "Anta", 
  },

});
