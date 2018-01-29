// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    margin: 0
  },
  body: {
    bottom: 0,
    width: Metrics.screenWidth,
    position: "absolute",
    backgroundColor: Colors.background.primary
  },
  header: {
    flexDirection: "row",
    padding: Metrics.baseMargin,
    backgroundColor: Colors.whiteSmoke
  }
});
