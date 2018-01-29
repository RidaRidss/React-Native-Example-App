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
    justifyContent: "center",
    width:32,
    height:30
  },
  icon: {
    width: Metrics.ratio(19),
    height: Metrics.ratio(18)
  }
});
