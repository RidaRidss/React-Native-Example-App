// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 0.8,
    alignItems: "center",
    padding: Metrics.ratio * 18,
    // backgroundColor: Colors.facebook,
    borderRadius: Metrics.borderRadius
  }
});
