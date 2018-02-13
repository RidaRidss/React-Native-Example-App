// @flow
import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  inputContainer: {
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: -1,
      width: 1
    },
    shadowColor: "#f1f1f1",
    backgroundColor: Colors.background.primary
  },
  input: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.book,
    borderRightWidth: Metrics.horizontalLineHeight,
    borderRightColor: Colors.border,
    textAlign: "left"
  },
  send: {
    height: 44,
    width: 44,
    alignItems: "center",
    justifyContent: "center"
  }
});
