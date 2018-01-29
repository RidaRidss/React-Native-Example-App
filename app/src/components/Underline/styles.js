// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";
import Utils from "../../util";

export default StyleSheet.create({
  container: {
    width: Metrics.ratio(33),
    height: Metrics.ratio(1.5),
    backgroundColor: Colors.black,
    marginTop: Utils.isPlatformAndroid() ? Metrics.smallMargin * 1.5 : 0,
    marginBottom: Utils.isPlatformAndroid()
      ? Metrics.smallMargin * 1.3
      : Metrics.smallMargin * 1.5
  }
});
