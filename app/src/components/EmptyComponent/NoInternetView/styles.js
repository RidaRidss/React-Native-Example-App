// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background.primary
  },
  leftButtonView: {
    borderWidth: Metrics.horizontalLineHeight,
    borderColor: Colors.black,
    // padding: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    // marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin * 3,
    paddingVertical: Metrics.baseMargin
  },
  noInternetImage: {
    width: Metrics.image.xLarge,
    height: Metrics.image.xLarge
    // marginTop: -Metrics.doubleBaseMargin * 2
  },
  noConnection: {
    margin: Metrics.baseMargin,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    textAlign: "center"
  }
});
