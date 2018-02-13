// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import styles from "./styles";
import { Text, ButtonView } from "../../";
import { Images } from "../../../theme";

export default class NoInternetView extends Component {
  static propTypes = {
    onRetryPress: PropTypes.func
  };

  static defaultProps = {
    onRetryPress: () => {}
  };
  render() {
    const { onRetryPress } = this.props;
    return (
      <View style={styles.container}>
        <Image source={Images.noInternet} style={styles.noInternetImage} />
        <Text size="xxLarge" color="secondary" type="bold">
          Ooops!
        </Text>
        <Text color="secondary">
          No internet connection found check your connection
        </Text>
        <ButtonView style={styles.leftButtonView} onPress={onRetryPress}>
          <Text color="secondary" type="medium" size="xSmall">
            Try Again
          </Text>
        </ButtonView>
      </View>
    );
  }
}
