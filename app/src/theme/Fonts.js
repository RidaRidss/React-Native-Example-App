// @flow
// Android
// title 20
// Heading 16
// desc 14

// ios
// title 20
// Heading 20
// desc 17


// ============= Import Fonts here , define desire font sizes ================= //

import { Platform } from "react-native";
import Metrics from "./Metrics";

const type = {
  base: "Avenir-Light",
  heavy: "Avenir-Heavy",
  medium: "Avenir-Medium",
  light: "Avenir-Light",
  book: "Avenir-Book",
  black: "Avenir-Black"
};

// Metrics.generatedFontSize(ios, android)

const size = {
  xxxSmall: Metrics.generatedFontSize(11),
  xxSmall: Metrics.generatedFontSize(12),
  xSmall: Metrics.generatedFontSize(14),
  small: Metrics.generatedFontSize(15),
  normal: Metrics.generatedFontSize(17),
  eighteen: Metrics.generatedFontSize(18),
  medium: Metrics.generatedFontSize(16),
  large: Metrics.generatedFontSize(20),
  xLarge: Metrics.generatedFontSize(25),
  xxLarge: Metrics.generatedFontSize(30),
  xxxLarge: Metrics.generatedFontSize(40),
  xxxxLarge: Metrics.generatedFontSize(50)
};

export default {
  type,
  size
};
