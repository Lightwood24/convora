import { StyleSheet } from "react-native";
import theme from "./Theme";

export default StyleSheet.create({
  // == LAYOUT ==
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.backgroundOpaque55,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.lg,
  },

  centerWrap: {
    width: "100%",
    maxWidth: 420,
    alignItems: "center",
  },

  kav: {
    width: "100%",
  },

  card: {
    width: "100%",
    height: 300,
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: theme.radius.xl,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    overflow: "hidden",
  },

  // == HEADER ==
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderMuted,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    ...theme.typography.h2,
    color: theme.colors.textPrimary,
  },

  closeBtn: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.md,
  },

  closeText: {
    ...theme.typography.base,
    color: theme.colors.textSecondary,
  },

  // == BODY ==
  body: {
    flexGrow: 0,
    height: "80%",
  },

  bodyContent: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },

  bodyTitle: {
    ...theme.typography.base,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },

  bodyText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
  },
  inputPressable: {
    width: "100%",
    minHeight: 48,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    borderRadius: theme.radius?.lg ?? 12,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: "center",
    backgroundColor: theme.colors.secondaryBackground,
  },
  inputPressed: {
    backgroundColor: theme.colors.backgroundOpaque25,
  },
  inputText: {
    color: theme.colors.textPrimary,
    fontFamily: "Anta",
    ...theme.typography.small,
  },
  actionsRow: {
    width: "86%",              
    flexDirection: "row",
    columnGap: theme.spacing.sm,             
    marginTop: theme.spacing.lg,
    alignSelf: "center",
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
  },
  actionBtnIcon: {
    width: 25,
    height: 25,
    tintColor: theme.colors.textPrimary,
  },
  
  // == FOOTER ==
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderMuted,
    flexDirection: "row",
    gap: theme.spacing.md,
    justifyContent: "flex-end",
  },
  primaryBtn: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.primaryMuted,
  },
  secondaryBtn: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.secondary,
  },
  footerBtnText: {
    ...theme.typography.base,
    color: theme.colors.textSecondary,
  },

});
