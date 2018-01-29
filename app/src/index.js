/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from "react-redux";
import {
  AppRegistry,
  NativeModules,
  StatusBar,
  Platform,
  AppState,
  BackHandler,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View
} from "react-native";

// import KeyboardManager from 'react-native-keyboard-manager'
import SplashScreen from "react-native-splash-screen";
import applyConfigSettings from "./config";
import NetworkInfo from "./services/NetworkInfo";
import { networkInfoListener } from "./actions/NetworkInfoActions";
import configureStore from "./store";
const reducers = require("./reducers").default;

import { Actions } from "react-native-router-flux";
import AppNavigator from "./navigator";


applyConfigSettings();

class App extends Component {

  state = {
    isLoading: true,
    store: configureStore(reducers, () => {
          // NativeModules.SplashScreen.hide();
      // custom splash screen added by component to fix react native fast splash delay
      this.setState({ isLoading: false });
      SplashScreen.hide();
    })
  };
  // constructor() {
  //   super(); 

  //   // ===== uncoment below lines of code if keyboard toolbar is not working in ios from config code , import first on top

  //   // KeyboardManager.setEnable(true);
  //   // KeyboardManager.setToolbarPreviousNextButtonEnable(true);
 
  //   // =========================================================
  // }
  componentDidMount() {
     //   // StatusBar.setBarStyle("light-content");
  //   // StatusBar.setBarStyle("dark-content");
    
  //   // Actions.refresh({
  //   //     onRight: () => null
  //   //     ,
  //   //     onLeft: () => null
  //   //   });
    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
    // Utils.isPlatformAndroid()
    //   ? this._requestLocationPermission()
    //   : this._startLocationService(true);
  }
  // componentWillReceiveProps(nextProps) {
  //   // Actions.refresh({
  //   //     onRight: () => null
  //   //     ,
  //   //     onLeft: () => null
  //   //   });
  // }
//   componentWillMount() {
// }
// shouldComponentUpdate(nextProps: Object, nextState: Object) { 

// }
  componentWillUnmount() {
    NetworkInfo.removeNetworkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
    // navigator.geolocation.clearWatch(LocationServices.getWatchID());
  }

  render() {
    if (this.state.isLoading) {
      return null ;
    }

    return (
      <View style={{ flex: 1 }}>
        <Provider store={this.state.store}>
          <AppNavigator />
        </Provider>
        </View>
        // <MessageBar />
    );
  }
}

AppRegistry.registerComponent("app", () => App);

