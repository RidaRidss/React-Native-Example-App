import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    paddingHorizontal: Metrics.baseMargin
  },
  addChatButton: {
    flex: 1,
    position: "absolute",
    right: 10,
    bottom: 10
  }
});
