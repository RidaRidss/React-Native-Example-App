// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: Metrics.baseMargin,
    backgroundColor: Colors.primary.backgroundColor
  },
  button: {
    width: Metrics.screenWidth - Metrics.baseMargin,
    borderWidth: 1,
    padding: Metrics.smallMargin * 1.3,
    borderColor: "#8cd3d6",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.secondary
  }
});
