// @flow
import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import styles from "./styles";

export default class GifAnimation extends React.PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { containerStyle, source, ...rest } = this.props;

    return (
      <View style={[this.props.containerStyle, styles.containerStyle]}>
        <Image source={this.props.source} {...rest} />
      </View>
    );
  }
}

export { GifAnimation };
