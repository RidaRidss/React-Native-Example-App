import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import { Images, Metrics } from "../../theme";

const TabIcon = ({ title, focused }) => {
  return (
    <Image
      resizeMode="contain"
      style={{
        width: Metrics.icon.normal,
        height: Metrics.icon.normal
      }}
      source={
        Images[(title + (focused ? "_selected" : "")).toLocaleLowerCase()]
      }
    />
  );
};

TabIcon.propTypes = {
  title: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export default TabIcon;
