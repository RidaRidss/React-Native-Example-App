import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../theme";

export default StyleSheet.create({
  horizontalContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: Metrics.searchBarHeight,
    backgroundColor: Colors.primary
  },
  icon: {
    margin: Metrics.smallMargin,
    width: Metrics.icon.small,
    height: Metrics.icon.small
  },
  textInput: {
    flex: 1,
    color: Colors.secondary,
    fontFamily: Fonts.type.base
  }
});
