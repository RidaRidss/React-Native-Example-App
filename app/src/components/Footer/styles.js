// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.smallMargin,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
