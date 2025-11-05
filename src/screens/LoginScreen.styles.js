import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
  centerArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: 8,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  appName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  card: {
    width: "86%",
    backgroundColor: "#1d1d1d",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  cardBody: {
    padding: 16,
    gap: 8,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  arrow: {
    color: "#aaa",
    fontSize: 16,
  },
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
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    color: "#888",
    marginTop: 8,
    marginBottom: 50,
    fontStyle: "italic",
  },
});

export default styles;


