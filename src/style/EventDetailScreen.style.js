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
    height: 300,
    width: "100%",
    backgroundColor: theme.colors.backgroundOpaque35,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderColor: theme.colors.borderWhite,
    borderWidth: 1,
  },
  boxTitle: {
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.backgroundOpaque35,
    borderTopStartRadius: theme.radius.xl,
    borderTopEndRadius: theme.radius.xl,
    padding: theme.spacing.xs,
  },
  boxDesc: {
    ...theme.typography.base,
    color: theme.colors.textSecondary,
    backgroundColor: theme.colors.backgroundOpaque35,
    borderBottomStartRadius: theme.radius.xl,
    borderBottomEndRadius: theme.radius.xl,
    padding: theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  // == PARTICIPANTS ==
  participantsList: {
    flex: 1,
  },
  participantsListContent: {
    paddingBottom: theme.spacing.xs,
  },
  participantRow: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.backgroundOpaque20,
    marginBottom: theme.spacing.xs,
  },
  participantRowInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  participantAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: theme.colors.borderWhite,
  },
  participantText: {
    color: theme.colors.textPrimary,
  },
  participantEmpty: {
    color: theme.colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
  plusOneBadge: {
    marginLeft: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderWhite,
    backgroundColor: theme.colors.backgroundOpaque25,
  },
  plusOneBadgeText: {
    color: theme.colors.textPrimary,
    fontSize: 11,
  },
  plusOneToggle: {
    marginLeft: "auto",
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.borderWhite,
    backgroundColor: theme.colors.backgroundOpaque25,
  },
  plusOneToggleOn: {
    backgroundColor: theme.colors.backgroundOpaque35,
  },
  plusOneToggleText: {
    color: theme.colors.textPrimary,
    fontSize: 12,
  },

  // == CHAT ==
  chatBox: {
    justifyContent: "flex-start",
  },
  chatInner: {
    flex: 1,
    marginTop: 8,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingVertical: 6,
  },
  msgRow: {
    marginBottom: 8,
    maxWidth: "88%",
  },
  msgRowMe: {
    alignSelf: "flex-end",
  },
  msgRowOther: {
    alignSelf: "flex-start",
  },
  msgMeta: {
    fontSize: 11,
    color: theme.colors.backgroundWhiteOpaque75,
    marginBottom: 2,
  },
  msgBubble: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  msgBubbleMe: {
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  msgBubbleOther: {
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  msgText: {
    color: "#fff",
    fontSize: 13,
  },
  chatInputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginTop: 8,
  },
  chatInput: {
    flex: 1,
    minHeight: 38,
    maxHeight: 92,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(0,0,0,0.18)",
    color: "#fff",
    fontSize: 13,
  },
  sendBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  sendBtnDisabled: {
    opacity: 0.6,
  },
  sendBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
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
