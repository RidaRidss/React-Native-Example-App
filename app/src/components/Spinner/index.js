import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors } from "../../theme";

const Spinner = () => (
  <ActivityIndicator
    animating
    color={Colors.background.quaternary}
    size="small"
  />
);

export default Spinner;
