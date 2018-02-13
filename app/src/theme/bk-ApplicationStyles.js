// @flow

// ========== Define app general styling here ============== //

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
  navBarIconContainer: {
    padding: Metrics.baseMargin,
    alignItems: "center",
    justifyContent: "center"
  },
  navBarIcon: {
    width: Metrics.icon.normal - 5,
    height: Metrics.icon.normal - 5
  },
  shadowStyle: {
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0
    },
    elevation: 2
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
  emptyDataGif: {
    width: Metrics.image.medium,
    height: Metrics.image.medium,
    resizeMode: "contain"
  }
};
