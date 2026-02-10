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
    justifyContent: "flex-end",
  },
  bodySection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  footerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  // == HEADER ==
  header: {
    alignItems: "center",
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.md,
  },
  appName: {
    color: theme.colors.textPrimary,
    ...theme.typography.h1,          
  },
  slogan: {
    color: theme.colors.textSecondary,
    ...theme.typography.base
  },

  // == BODY ==
  card: {
    width: "86%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderMuted,
  },
  cardTitle: {
    color: theme.colors.textSecondary,
    ...theme.typography.base,              
  },
  arrow: {
    color: theme.colors.textMuted,
    ...theme.typography.base,              
  },
  cardBody: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  // == INPUTS / BUTTONS ==
  input: {
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    height: 46,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    fontFamily: "Anta",
  },
  passwordIcon: {
    position: "absolute",
    right: theme.spacing.md,
    top: "50%",
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  errorText: {
    color: theme.colors.danger,
    marginTop: 4,
    ...theme.typography.small,
  },
  
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
    letterSpacing: 0.3,
    fontFamily: "Anta",              
  },

  // == FOOTER ==
  footerText: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xxxl,
    ...theme.typography.small,
  },
  
});
