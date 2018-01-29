import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center"
  },
  description: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.medium,
    color: Colors.text.tertiary,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin
  },
  title: {
    fontSize: Fonts.size.xxLarge,
    fontFamily: Fonts.type.medium,
    color: Colors.text.tertiary
  },
  buttonText: {
    top: -2,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.medium,
    color: Colors.text.tertiary
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Metrics.doubleBaseMargin,
    backgroundColor: Colors.background.quaternary,
    paddingHorizontal: Metrics.doubleBaseMargin * 2,
    paddingVertical: Metrics.baseMargin,
    borderRadius: Metrics.borderRadius
  }
});
