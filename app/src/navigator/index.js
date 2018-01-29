// @flow
import React from "react";
import { connect, View, Image } from "react-redux";
import {
  Stack,
  Scene,
  Router,
  Actions,
  ActionConst
} from "react-native-router-flux";
import { Text } from "react-native";
import {Home} from "../containers";

const navigator = Actions.create(
  <Stack
    key="root"
  >
  <Scene initial key="home" component={Home}/>
  </Stack>
);

export default () => <AppNavigator navigator={navigator} />;

const AppNavigator = connect()(Router);

