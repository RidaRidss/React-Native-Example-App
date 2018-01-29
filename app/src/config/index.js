// @flow
import { Text, StatusBar } from "react-native";
import IQKeyboardManager from "./IQKeyboardManager";
import DebugSettings from "./DebugSettings";
import AppConfig from "./AppConfig";

export default () => {
  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.disableYellowBox = !DebugSettings.yellowBox;
  }

    StatusBar.setBarStyle("light-content");
    // StatusBar.setBarStyle("dark-content");

  // Allow/disallow font-scaling in app
  Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling;
};
