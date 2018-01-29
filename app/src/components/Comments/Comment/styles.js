// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  avatar: {
    margin: Metrics.baseMargin,
    width: Metrics.image.medium,
    height: Metrics.image.medium
  },
  comment: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    backgroundColor: Colors.whiteSmoke
  },
  attachment: {
    width: null,
    height: 200
  },
  margin: {
    marginHorizontal: Metrics.baseMargin,
    marginVertical: Metrics.smallMargin
  },
  footer: {
    flex: 1,
    marginTop: 0,
    flexDirection: "row",
    margin: Metrics.baseMargin
  },
  likeContainer: {
    flexDirection: "row"
  },
  like: {
    resizeMode: "contain",
    width: Metrics.icon.small,
    height: Metrics.icon.small,
    marginLeft: Metrics.baseMargin,
    marginTop: Metrics.smallMargin
  },
  likeCount: {
    marginLeft: Metrics.smallMargin
  },
  activityIndicator: {
    flex: 1,
    alignItems: "flex-end"
  }
});
