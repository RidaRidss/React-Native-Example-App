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
import { Signup, Login, Detail, Chat, Inbox } from "../containers";
import styles from "./styles";

const navigator = Actions.create(
  <Stack
    titleStyle={styles.title}
    headerStyle={styles.header}
    key="root"
    backTitle=""
    tintColor="black"
  >
    <Scene title="Sign Up" key="signup" component={Signup} />
    <Scene
      title="Login"
      initial
      key="login"
      component={Login}
      type={ActionConst.RESET}
    />
    <Scene
      type={ActionConst.RESET}
      title="Detail Center"
      key="detail"
      component={Detail}
    />
    <Scene title="Chat" key="Chat" component={Chat} hideTabBar />
    <Scene key="inbox" component={Inbox} title="Inbox" back hideTabBar />
  </Stack>
);

export default () => <AppNavigator navigator={navigator} />;

const AppNavigator = connect()(Router);
