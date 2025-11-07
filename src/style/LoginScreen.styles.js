import { StyleSheet } from "react-native";
import theme from "./Theme";

export default StyleSheet.create({
  // === LAYOUT ===
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },

  // === HEADER ===
  headerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: theme.spacing.sm,
    borderRadius: 9,
  },
  appName: {
    color: theme.colors.textPrimary,
    ...theme.typography.h1,          
  },

  // === BODY ===
  bodySection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    width: "86%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderMuted,
  },
  cardTitle: {
    color: theme.colors.textSecondary,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Anta",              
  },
  arrow: {
    color: theme.colors.textMuted,
    fontSize: 16,
    fontFamily: "Anta",              
  },
  cardBody: {
    padding: theme.spacing.lg,
    gap: 10,
  },

  // === INPUTS ===
  input: {
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.radius.md,
    paddingHorizontal: 14,
    height: 46,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    fontFamily: "Anta",              
  },
  passwordIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 4,
  },

  // === BUTTON ===
  button: {
    height: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: "Anta",              
  },

  // === FOOTER ===
  footerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footer: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    marginBottom: 50,
    fontStyle: "italic",
    ...theme.typography.small,       
    fontFamily: "Anta",              
  },
});
