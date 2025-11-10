import { StyleSheet } from "react-native";
import theme from "./Theme";

export default StyleSheet.create({
  // === LAYOUT ===
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
