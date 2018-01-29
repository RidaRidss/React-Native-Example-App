// @flow
import { StyleSheet } from "react-native";
import { Metrics, Colors, ApplicationStyles } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  marginRight: {
    marginRight: Metrics.baseMargin
  },
  socialIcon: {
    resizeMode: "contain",
    width: Metrics.icon.small,
    height: Metrics.icon.small
  },
  paddingLeft: {
    paddingRight: Metrics.smallMargin
  },
  paddingRight: {
    paddingRight: Metrics.doubleBaseMargin
  },
  likeCommentShareMargin: {
    marginHorizontal: Metrics.baseMargin
  },
  likeCommentShareMarginTop: {
    marginBottom: Metrics.smallMargin / 2
  },
  likeCommentShareRightView: {
    marginRight: Metrics.baseMargin,
    paddingLeft: Metrics.baseMargin * 2,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.smallMargin
  },
  likeCommentShareLeftView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Metrics.baseMargin
  },
  rippleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.smallMargin,
    alignItems: "center"
  },
  text: {
    marginLeft: Metrics.baseMargin,
    paddingRight: Metrics.baseMargin,
    ...ApplicationStyles.dateLight16
  }
});
