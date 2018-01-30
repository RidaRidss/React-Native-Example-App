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
  // StatusBar,
  Platform,
  // AppState,
  // BackHandler,
  PermissionsAndroid,
  View
} from "react-native";

import { Actions } from "react-native-router-flux";

import NetworkInfo from "./services/NetworkInfo";
import { networkInfoListener } from "./actions/NetworkInfoActions";
import LocationServices from "./services/LocationService";
import { request, success, failure } from "./actions/UserLocationActions";

const reducers = require("./reducers").default;

import configureStore from "./store";
import applyConfigSettings from "./config";
import AppNavigator from "./navigator";

// import KeyboardManager from 'react-native-keyboard-manager'
import SplashScreen from "react-native-splash-screen";


import { MessageBar } from "./components";

import Utils from "./util";

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

  //   // ===== uncoment constructor of code if keyboard toolbar is not working in ios from config code , import first on top

  //   // KeyboardManager.setEnable(true);
  //   // KeyboardManager.setToolbarPreviousNextButtonEnable(true);
 
  //   // =========================================================
  // }

  componentDidMount() {
    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
    Utils.isPlatformAndroid()
      ? this._requestLocationPermission()
      : this._startLocationService(true);
  }

  componentWillUnmount() {
    NetworkInfo.removeNetworkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
    navigator.geolocation.clearWatch(LocationServices.getWatchID());
  }

  _requestLocationPermission = async () => {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!check) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Running Partner needs location permission to work."
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Location permission granted
          this._startLocationService(granted);
        } else {
          // Location permission denied
          this.state.store.dispatch(request(granted));
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      // location permission already allowed
      this._startLocationService(
        this.state.store.getState().userLocation.permissionGranted
      );
    }
  };

  _startLocationService(granted) {
    this.state.store.dispatch(request(granted));
    LocationServices.startLocationService(
      success,
      failure,
      this.state.store.dispatch,
      navigator.geolocation
    );
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
        <MessageBar />
        </View>
    );
  }
}

AppRegistry.registerComponent("app", () => App);

