// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: Metrics.baseMargin,
    backgroundColor: Colors.primary.backgroundColor
  },
  body: {
    flex: 1,
    backgroundColor: Colors.transparent,
    marginHorizontal: Metrics.smallMargin
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparent
  },
  rightContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparent
  },
  textInputStyle: { height: 35, lineHeight: 14, left: -4, paddingBottom: 3 }
});
