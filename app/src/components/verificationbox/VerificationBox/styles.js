// @flow
import { StyleSheet } from "react-native";

import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: Metrics.baseMargin * 1.5
  },
  input: {
    height: Metrics.doubleBaseMargin * 3,
    width: Metrics.doubleBaseMargin * 3,
    backgroundColor: Colors.background.primary,
    marginLeft: Metrics.smallMargin,
    fontSize: Fonts.size.xxxLarge,
    textDecorationLine: "none",
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: Fonts.type.light
  }
});
