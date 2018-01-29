import { StyleSheet } from "react-native";
import { Colors } from "../../theme";

export default StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabs: {
    height: 50,
    flexDirection: "row",
    backgroundColor: Colors.background.primary
  }
});
