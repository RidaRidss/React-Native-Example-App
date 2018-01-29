// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Text, StyleSheet , Platform} from "react-native";
import { Actions } from "react-native-router-flux";

import styles from "./styles";

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
      'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

class Home extends Component {
  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>
          Single Page apps
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = ({ route }) => ({
  route
});

const actions = {};

export default connect(mapStateToProps, actions)(Home);
