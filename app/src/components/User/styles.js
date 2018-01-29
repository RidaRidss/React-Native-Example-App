// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary
  },
  profile: {
    resizeMode: "cover",
    width: Metrics.image.large,
    height: Metrics.image.large
  },
  detail: {
    // flex: 1,
    marginLeft: Metrics.baseMargin
  },
  addressDetail:{
flexDirection:"column",
justifyContent:"space-between",
width:Metrics.ratio * 270,
marginLeft:Metrics.baseMargin

  },
  // marginLeft: {
  //   marginLeft:Metrics.baseMargin
  // }
});
