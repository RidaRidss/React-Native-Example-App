// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    margin: Metrics.baseMargin
  },
  body: {
    width: Metrics.screenWidth - Metrics.baseMargin * 2,
    backgroundColor: Colors.background.primary
  },
  header: {
    elevation: 1,
    flexDirection: "row",
    padding: Metrics.baseMargin,
    backgroundColor: Colors.whiteSmoke
  }
});
