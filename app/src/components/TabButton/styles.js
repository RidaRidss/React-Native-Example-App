import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: Metrics.navBarHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  iconContainer: {
    paddingRight: Metrics.baseMargin,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: Metrics.icon.small,
    height: Metrics.icon.small
  }
});
