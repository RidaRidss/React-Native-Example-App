// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.login
  },
  button: {
    marginBottom: Metrics.smallMargin,
    marginTop: Metrics.smallMargin
  },
  headerText: {
    textAlign: "center",
    lineHeight: Metrics.lineHeight,
    marginTop: Metrics.doubleBaseMargin * 2,
    marginBottom: Metrics.doubleBaseMargin * 3,
    marginHorizontal: Metrics.baseMargin * 2
  },
  digitLabel: {
    marginBottom: Metrics.baseMargin * 1.2,
    textAlign: "center"
  },
  resendCode: {
    marginTop: Metrics.doubleBaseMargin,
    textAlign: "center"
  },
  input: {
    width: 50,
    height: 50
  }
});
