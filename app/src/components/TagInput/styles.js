import { StyleSheet } from "react-native";
import { Metrics, Fonts, Colors } from "../../theme";

export default StyleSheet.create({
  horizontalContainer: {
    borderBottomColor: Colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tagsContainer: {
    borderRadius: Metrics.borderRadius,
    flexDirection: "row"
  },
  tagText: {
    color: Colors.text.secondary,
    fontSize: Fonts.size.large
  },
  image: {
    width: Metrics.icon.tiny,
    height: Metrics.icon.tiny
  },
  inputText: {
    width: 150,
    padding: 0,
    color: Colors.text.secondary,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.base
  }
});
