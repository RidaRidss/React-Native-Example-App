// @flow
import React from "react";
import PropTypes from "prop-types";

import { View } from "react-native";
import styles from "./styles";

export default class Footer extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  };
  static defaultProps = {
    style: {}
  };

  render() {
    const { children } = this.props;

    return <View style={styles.container}>{children}</View>;
  }
}
