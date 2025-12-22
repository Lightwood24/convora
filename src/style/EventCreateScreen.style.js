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
    ...theme.typography.h1,
    color: theme.colors.textPrimary,
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

  // dropdown + bar
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

  // overlayelt dropdown list
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

  // == CARD INNER (background + overlay) ==
  cardInnerBg: {
    width: "100%",
    height: 420,
  },
  cardInnerBgImage: {
    resizeMode: "cover",
  },
  cardInnerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: theme.spacing.md,
  },
  cardInner: {
    width: "100%",
    height: 420,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surfaceElevated,
  },
  cardInnerContent: {
    flex: 1,
    justifyContent: "flex-start",
  },

  // == CARD LAYOUT ==
  cardInput: {
    flex: 1,
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    justifyContent: "center",
  },
  
  topRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.md,
  },
  dateBox: {
    width: 140,
    height: 80,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.md,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  titleColumn: {
    flex: 1,
  },
  inputLargeWrapper: {
    height: 40,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.border,
    marginBottom: theme.spacing.xs,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
  },
  inputSmallWrapper: {
    height: 32,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
  },

  descriptionBox: {
    flex: 1,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: "rgba(0,0,0,0.35)",
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  addressBox: {
    height: 46,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: 0,
    justifyContent: "center",
  },

  // == PRIMARY ACTION BUTTONS ==
  primaryActionsRow: {
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
  discardButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  saveAsDraftButton: {
    flex: 2,
    backgroundColor: theme.colors.primary,
  },
  shareButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: theme.colors.textPrimary,
    fontWeight: "600",
    fontFamily: "Anta",
  },

  // == FOOTER ==
  naviActionsRow: {
    width: "86%",
    flexDirection: "row",
    columnGap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
    alignSelf: "center",
  },
  actionBtn: {
    flex: 1,
  },
  naviButton: {
    backgroundColor: theme.colors.navigation,
  },
});
