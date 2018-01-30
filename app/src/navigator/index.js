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
  // <Scene

  // initial key="login" component={Login}/>
  // <Scene key="detail" component={Detail}/>


  <Stack
  key="root"
  backTitle=" "
  // titleStyle={styles.title}
  // headerStyle={styles.header}
  tintColor="white"
  >  

  <Scene
  initial
  key="home"
  // headerStyle={styles.headerTransparent}
  component={Login}
  type={ActionConst.RESET}
/>


    <Scene
      // renderLeftButton={() => (
      //   <TabButtonLeft imagesArray={["back"]} actions={[Actions.pop]} />
      // )}
      // headerStyle={styles.headerTransparent}
      key="detail"
      component={Detail}
    />


  </Stack>
);

export default () => <AppNavigator navigator={navigator} />;

const AppNavigator = connect()(Router);

