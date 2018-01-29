import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    // flexWrap: "wrap",
    alignItems: "center"
  },
  tag: {
    justifyContent: "center",
    // backgroundColor: "black",
    color: "white",
    borderRadius: Metrics.ratio(80),
    paddingHorizontal: Metrics.ratio(10),
    // marginLeft: Metrics.ratio(5),
    paddingVertical: Metrics.ratio(2)
  }
});
