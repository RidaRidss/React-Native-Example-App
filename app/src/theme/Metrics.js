/*
 * @flow
 * TODO: value * ratio difference between Android and iOS is of 2 value;
 * 16 in iOS is equals to 14 in android but this need to be verify.
 */

 // ========== app resize style setting here ================ //

import { Dimensions, Platform, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => screenWidth / guidelineBaseWidth * +size;
const scaleVertical = size => screenHeight / guidelineBaseHeight * size;

const ratio = (iosSize: number, androidSize: ?number) =>
  Platform.select({
    ios: scaleVertical(iosSize),
    android: androidSize || iosSize
  });

const generatedFontSize = (iosFontSize: number, androidFontSize: ?number) =>
  Platform.select({
    ios: scale(iosFontSize),
    android: androidFontSize || iosFontSize
  });

const NAVBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 0;

export default {
  ratio,
  screenWidth,
  screenHeight,
  generatedFontSize,
  oneThirdScreenWidth: ratio(screenWidth / 1.5),
  smallMargin: ratio(8),
  baseMargin: ratio(16),
  doubleBaseMargin: ratio(32),
  statusBarHeight: STATUSBAR_HEIGHT,
  horizontalLineHeight: 0.5, //StyleSheet.hairlineWidth,
  navBarHeight: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,
  tabBarHeight: 49, // Default tab bar height in iOS 10 (source react-navigation)
  borderRadius: ratio(0),
  defaultUIHeight: ratio(55),
  icon: {
    tiny: ratio(8),
    small: ratio(16),
    normal: ratio(24), // Default tab icon size (source react-navigation)
    medium: ratio(32),
    large: ratio(40),
    xLarge: ratio(50),
    xxLarge: ratio(60),
    xxxLarge: ratio(100)
  },
  image: {
    mini: ratio(0.7),
    tiny: ratio(12),
    tiny2: ratio(16),
    small: ratio(20),
    xsmall: ratio(30),
    medium: ratio(52),
    large: ratio(65),
    xLarge: ratio(260),
    xxLarge: ratio(80),
    xxxLarge: ratio(136),
    coverWidth: screenWidth,
    coverHeight: screenWidth / 2
  }
};
