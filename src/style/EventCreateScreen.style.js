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
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
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
    marginBottom: -20,
    paddingHorizontal: theme.spacing.lg,
  },
  screenTitle: {
    color: theme.colors.textPrimary,
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
    textAlign: "center",
  },

  // == INVITE CARD ==
  card: {
    width: "86%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.card,
    overflow: "hidden",
  },

  templateContainer: {
    position: "relative",
  },
  templateBar: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderMuted,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceElevated,
    zIndex: 2,
  },
  templateText: {
    ...theme.typography.base,
    color: theme.colors.textMuted,
    fontStyle: "italic",
  },
  templateChevron: {
    ...theme.typography.base,
    color: theme.colors.textMuted,
  },

  templateListOverlay: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    zIndex: 3,
    backgroundColor: theme.colors.surfaceElevated,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderMuted,
  },
  templateListScroll: {
    maxHeight: 220,
  },
  templateList: {
    paddingVertical: theme.spacing.xs,
  },
  templateItem: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  templateItemSelected: {
    backgroundColor: theme.colors.primaryMuted + "33",
  },
  templateItemText: {
    ...theme.typography.base,
    color: theme.colors.textSecondary,
  },
  templateItemTextSelected: {
    color: theme.colors.primaryMuted,
    fontWeight: "600",
  },

  cardInner: {
    padding: theme.spacing.lg,
    height: 430,
  },
  cardInnerBg: {
    padding: theme.spacing.lg,
    height: 430,
  },
  cardInnerBgImage: {
    resizeMode: "cover",
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
  },
  cardInnerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },
  cardInnerContent: {
    flex: 1,
  },

  topRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },
  dateBox: {
    width: 72,
    height: 72,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
    backgroundColor: theme.colors.surfaceElevated,
  },
  dateText: {
    ...theme.typography.small,
    color: theme.colors.textMuted,
    textAlign: "center",
  },
  titleColumn: {
    flex: 1,
  },
  inputMockLarge: {
    height: 40,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  inputMockSmall: {
    height: 32,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  inputMockText: {
    ...theme.typography.small,
    color: theme.colors.textSecondary,
    fontStyle: "italic",
  },

  descriptionBox: {
    height: 180,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  descriptionPlaceholder: {
    ...theme.typography.base,
    color: theme.colors.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
  },

  addressBox: {
    height: 48,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderMuted,
    justifyContent: "center",
    paddingHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    backgroundColor: "rgba(0,0,0,0.25)",
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

  primaryActionsRow: {
    width: "86%",
    flexDirection: "row",
    columnGap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    alignSelf: "center",
  },
  discardButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  shareButton: {
    flex: 2,
    backgroundColor: theme.colors.primary,
  },
});
