/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NativeModules,
  StatusBar,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Actions } from "react-native-router-flux";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component {
  state = {
  };
  constructor(props) {
    super(props); 
}
  componentDidMount() {
    // StatusBar.setBarStyle("light-content");
    // StatusBar.setBarStyle("dark-content");
    
    // Actions.refresh({
    //     onRight: () => null
    //     ,
    //     onLeft: () => null
    //   });
  }

  componentWillReceiveProps(nextProps) {
    // Actions.refresh({
    //     onRight: () => null
    //     ,
    //     onLeft: () => null
    //   });
  }
  componentWillMount() {
}
shouldComponentUpdate(nextProps: Object, nextState: Object) { 

}
  componentWillUnmount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Single Pager App
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("app", () => App);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });