// @flow
import { StyleSheet, Platform } from "react-native";
import { Fonts, Colors, Metrics } from "../theme";
import Utils from "../util";

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.transparent,
    shadowColor: Colors.transparent,
    borderBottomWidth: 0,
    elevation: 0
  },
  title: {
    color: Colors.tertiary,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: Utils.isPlatformAndroid() ? Metrics.doubleBaseMargin * 3.8 : 0,
    fontWeight: "bold",
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.black
  }
});
