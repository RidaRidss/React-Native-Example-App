// @flow

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "../";
import styles from "./styles";
import NoInternetConnection from "./NoInternetView";

export default class EmptyComponent extends React.Component {
  static propTypes = {
    title: PropTypes.any,
    onRetryPress: PropTypes.func,
    isInternetConnected: PropTypes.bool
    // dataLength: PropTypes.number
  };

  static defaultProps = {
    onRetryPress: undefined,
    title: "Data Not Found",
    isInternetConnected: undefined
    // dataLength: 0
  };

  render() {
    const { isInternetConnected, onRetryPress, dataLength } = this.props;

    return (
      <View style={styles.container}>
        {!isInternetConnected ? (
          <NoInternetConnection onRetryPress={onRetryPress} />
        ) : (
          <Text>{this.props.title}</Text>
        )}
      </View>
    );
  }
}
