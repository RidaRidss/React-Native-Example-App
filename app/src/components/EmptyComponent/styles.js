// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center"
  },
  text: {
    // color: "#fff",
    textAlign: "center"
  },
  leftButtonView: {
    borderColor: Colors.black,
    // padding: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    margin: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin * 3,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.background.secondary
  }
});
