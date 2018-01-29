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
    paddingLeft: Metrics.baseMargin,
    alignItems: "center",
    justifyContent: "center",
    height:30,
    width:30
  },
  icon: {
    width: Metrics.ratio(17),
    height: Metrics.ratio(20)
  }
});
