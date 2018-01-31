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
import {Signup , Login , Detail} from "../containers";

const navigator = Actions.create(

  <Stack
  key="root"
  backTitle=" "
  tintColor="white"
  >  
  <Scene
  key="signup"
  component={Signup}
  />
  <Scene
  initial
  key="login"
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

