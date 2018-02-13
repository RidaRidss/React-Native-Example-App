// @flow

import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text, GifAnimation, ButtonView } from "../../components";
import styles from "./styles";
import NoInternetConnection from "./NoInternetView";
import { Metrics, Colors } from "../../theme";

export default class EmptyComponent extends React.Component {
  static propTypes = {
    title: PropTypes.any,
    buttonName: PropTypes.any,
    onRetryPress: PropTypes.func,
    routerAction: PropTypes.any,
    isInternetConnected: PropTypes.bool
    // dataLength: PropTypes.number
  };

  static defaultProps = {
    onRetryPress: undefined,
    title: "",
    isInternetConnected: undefined,
    buttonName: ""
    // dataLength: 0
  };

  render() {
    const {
      isInternetConnected,
      onRetryPress,
      dataLength,
      buttonName,
      subtitle,
      gifSource,
      details
    } = this.props;

    return (
      <View style={styles.container}>
        {!isInternetConnected ? (
          <NoInternetConnection onRetryPress={onRetryPress} />
        ) : (
          <View style={styles.container}>
            {this.props.gifSource}
            <Text
              size="eighteen"
              color="#3e3e3e"
              style={styles.text}
              type="black"
            >
              {this.props.title}
            </Text>
            <Text
              size="normal"
              color="##8d8d8d"
              style={[styles.text]}
              type="base"
            >
              {this.props.details}
            </Text>

            <Text
              size="normal"
              color="##8d8d8d"
              style={styles.text}
              type="base"
            >
              {this.props.subtitle}
            </Text>
            {buttonName ? (
              <ButtonView
                style={styles.leftButtonView}
                onPress={this.props.routerAction}
              >
                <Text
                  size="eighteen"
                  color={Colors.background.primary}
                  style={styles.text}
                  type="black"
                >
                  {buttonName}
                </Text>
              </ButtonView>
            ) : (
              <View />
            )}
          </View>
        )}
      </View>
    );
  }
}
