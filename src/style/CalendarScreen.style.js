import { StyleSheet } from "react-native";
import theme from "./Theme";

export default StyleSheet.create({
  // === LAYOUT ===
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
