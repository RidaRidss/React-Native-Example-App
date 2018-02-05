// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../theme";
import Utils from "../../util";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Metrics.baseMargin,
    justifyContent: "space-between",
    backgroundColor: "#F5FCFF"
  },
  fieldContainerView: {
    flex: 8,
    flexDirection: "column"
  },
  emptyView: {
    flex: 1,
    flexDirection: "row"
  },
  fieldView: {
    flex: 8,
    flexDirection: "row"
  },
  profilePicArea: {
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 2
  },
  profilePicStyle: {
    width: Metrics.image.large,
    height: Metrics.image.large
  },
  profileArea: {
    flexDirection: "column",
    flex: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  buttonView: {
    flex: 2,
    justifyContent: "flex-end"
  },
  button: {
    padding: Metrics.smallMargin * 1.3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Metrics.baseMargin,
    backgroundColor: Colors.tertiary
  },
  button2: {
    backgroundColor: Colors.secondary
  },
  progressView: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "center"
  }
});
