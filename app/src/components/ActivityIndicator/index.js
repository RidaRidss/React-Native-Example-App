// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator } from "react-native";
import { Text } from "../";
import styles from "./styles";

export default class Empty extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const { color, size } = this.props;
    return (
      <View style={styles.container}>
        <ActivityIndicator animating color={color} size={size} />
      </View>
    );
  }
}
