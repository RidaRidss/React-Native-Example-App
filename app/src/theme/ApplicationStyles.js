// // @flow
import Metrics from "./Metrics";
import Fonts from "./Fonts";
import Colors from "./Colors";

export default {
  flex: {
    flex: 1
  },
  navBarRightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  book14: {
    color: Colors.black,
    fontFamily: Fonts.type.book,
    fontSize: Fonts.size.xSmall
  },
  navBarIconContainer: {
    padding: Metrics.baseMargin,
    alignItems: "center",
    justifyContent: "center"
  },
  navBarIcon: {
    width: Metrics.icon.normal - 5,
    height: Metrics.icon.normal - 5
  },
  medium15: {
    color: Colors.black,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium
  },
  light16: {
    color: Colors.black,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium
  },
  messageBarTitle: {
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.medium
  },
  messageBarDescription: {
    color: Colors.white,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium
  },
  avenierBlack20: {
    color: Colors.white,
    fontFamily: Fonts.type.black,
    fontSize: Fonts.size.large
  },
  book18: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.book,
    color: Colors.black
  },
  emptyDataGif: {
    width: Metrics.image.medium,
    height: Metrics.image.medium
  }
};
