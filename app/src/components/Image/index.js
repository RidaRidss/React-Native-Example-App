// @flow
import React from "react";
import PropTypes from "prop-types";
import ImageLoad from "react-native-image-placeholder";

export default class Image extends React.PureComponent {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const { style, ...rest } = this.props;

    return <ImageLoad style={style} {...rest} />;
  }
}
