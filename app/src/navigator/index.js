// @flow
import React from "react";
import { connect } from "react-redux";
import {
  Stack,
  Scene,
  Router,
  Actions,
  ActionConst
} from "react-native-router-flux";
import { Text } from "react-native";
import {Login, Detail} from "../containers";

const navigator = Actions.create(
  
  <Stack
  key="root"
  backTitle=" "
  tintColor="white"
  >  

  <Scene
  initial
  key="home"
  component={Login}
  type={ActionConst.RESET}
/>


    <Scene
      key="detail"
      component={Detail}
    />


  </Stack>
);

export default () => <AppNavigator navigator={navigator} />;

const AppNavigator = connect()(Router);

