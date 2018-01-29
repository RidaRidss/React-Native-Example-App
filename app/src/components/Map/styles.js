// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.backgroundColor
  },
  userImageContainer: {
    alignItems: "center"
  },
  userImage: {
    width: Metrics.ratio * 25,
    height: Metrics.ratio * 25,
    marginTop: Metrics.ratio * 5,
    borderRadius: Metrics.ratio * 25 / 2
  }
});
