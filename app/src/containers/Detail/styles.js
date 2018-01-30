// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";
import Utils from "../../util";

export default StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    paddingHorizontal : Metrics.baseMargin,
    justifyContent:"space-between",
    backgroundColor: '#F5FCFF',
  },
  fieldView:{
  flex :6,
  },
  buttonView:{
flex:3
  },
  button: {
    padding: Metrics.smallMargin * 1.3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.tertiary
  },
  progressView:{
    flex:4,
    justifyContent:"flex-end",
    alignItems:"center" 
  }
});
