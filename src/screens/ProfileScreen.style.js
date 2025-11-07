import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // same structure & palette as LoginScreen
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  headerSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 120,
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

  // header
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  screenTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#888",
    textAlign: "center",
    lineHeight: 18,
  },

  // card
  card: {
    width: "86%",
    backgroundColor: "#1d1d1d",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#333",
  },
  cardBody: {
    padding: 16,
    gap: 8,
  },

  // avatar
  avatarBtn: { alignItems: "center", paddingTop: 16 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#e5e5e5",
  },
  avatarImg: { width: "100%", height: "100%" },
  avatarPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d4d4d4",
  },
  avatarIcon: { fontSize: 28 },
  changePhotoText: { color: "#93C5FD", marginTop: 8 },

  // inputs & button — same tones as LoginScreen
  input: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    color: "#fff",
  },
  button: {
    height: 44,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: "#fff", fontWeight: "600" },

  // footer
  footer: {
    color: "#888",
    marginTop: 8,
    marginBottom: 50,
    fontStyle: "italic",
  },
});
