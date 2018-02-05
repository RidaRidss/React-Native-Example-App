// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";
import Utils from "../../util";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: "space-between",
    backgroundColor: Colors.background.primary
  },
  fieldView: {
    flex: 9,
    justifyContent: "center"
  },
  securityImage: {
    width: Metrics.image.xsmall,
    height: Metrics.image.xsmall
  },
  buttonView: {
    justifyContent: "center",
    flex: 3
  },
  button: {
    padding: Metrics.smallMargin * 1.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.tertiary
  },
  button2: {
    backgroundColor: Colors.secondary
  },
  progressView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});
