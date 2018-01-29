// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    alignItems: "center"
  },
  leftButtonView: {
    borderWidth: Metrics.horizontalLineHeight,
    borderColor: Colors.black,
    // padding: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius,
    marginTop: Metrics.doubleBaseMargin * 2,
    paddingHorizontal: Metrics.doubleBaseMargin * 3,
    paddingVertical: Metrics.baseMargin
  },
  noInternetImage: {
    // width: Metrics.images.logo,
    // height: Metrics.images.logo,
    marginTop: -Metrics.doubleBaseMargin * 2
    // marginVertical: Metrics.doubleBaseMargin,
  }
});
