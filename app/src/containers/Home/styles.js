// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";
import Utils from "../../util";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal : Metrics.baseMargin,
    backgroundColor: '#F5FCFF',
  },
  button:{
    marginTop:Metrics.doubleBaseMargin
  }
});
