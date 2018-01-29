// @flow
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../../theme";

const borderWidth = 2;
export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderTopWidth: borderWidth,
    padding: Metrics.smallMargin,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background.primary
  },
  input: {
    flex: 1,
    color: Colors.text.secondary,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.medium,
    paddingTop: Metrics.smallMargin + 2
  },
  button: {
    width: Metrics.ratio * 50,
    alignItems: "center",
    borderLeftWidth: borderWidth,
    borderLeftColor: Colors.border,
    padding: Metrics.smallMargin
  }
});
