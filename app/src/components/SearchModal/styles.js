// @flow
import { StyleSheet, Platform } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    opacity: 0.8,
    margin: 0,
    paddingTop: Platform.OS === "ios" ? 24 : 0
  },
  done: {
    padding: Metrics.baseMargin
  }
});
