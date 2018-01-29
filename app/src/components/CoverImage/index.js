// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./styles";
import Utils from "../../util";
import { Metrics } from "../../theme";
import { View, Image } from "react-native";
import Lightbox from "react-native-lightbox";

export default class CoverImage extends Component {
  static propTypes = {
    width: PropTypes.number,
    borderRadius: PropTypes.number
  };

  static defaultProps = {
    width: Metrics.screenWidth,
    borderRadius: 0
  };

  render() {
    const { width, height } = this.props;
    return (
      <Lightbox
        activeProps={{
          style: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: null,
            height: Metrics.halfScreenHeight,
            justifyContent: "center",
            flex: 1,
            alignItems: "center"
          }
        }}
      >
        <Image
          // check on Ios
          style={{
            width: Metrics.image.medium,
            height: Metrics.image.medium,
            borderRadius: Metrics.image.medium / 2,
            borderWidth: Metrics.image.mini
          }}
          // resizeMode="contain"
          source={Utils.getValidImage(this.props.image)}
        />
      </Lightbox>
    );
  }
}
