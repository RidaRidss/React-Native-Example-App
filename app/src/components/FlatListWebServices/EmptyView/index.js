// @flow

import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text } from "../../";

export default class EmptyView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text size="medium" type="light">
          No Records Found
        </Text>
      </View>
    );
  }
}
