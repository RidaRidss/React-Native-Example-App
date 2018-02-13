// @flow
import { StyleSheet } from "react-native";
import { Colors } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary
  },
  footerContainer: {
    margin: 8,
    height: 10
  },
  footerText: {
    fontStyle: "italic"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
