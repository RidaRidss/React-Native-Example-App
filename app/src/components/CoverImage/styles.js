// @flow
import { StyleSheet } from "react-native";
import { Metrics } from "../../theme";
import Utils from "../../util";

export default StyleSheet.create({
  image: {
    height: Metrics.halfScreenWidth
  },
  closeButton: {
    color: "white",
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    borderRadius: 3,
    textAlign: "center",
    margin: 10,
    alignSelf: "flex-end"
  }
});
