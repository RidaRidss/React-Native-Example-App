// @flow

// ============== import redux libraries to connect redux =============== //

import { connect } from "react-redux";
import React, { Component } from "react";

// ==== import 'lodash' library to explore response values from api ===== //

import _ from "lodash";

// =========================================================================

// ======== import PropType to check props getting in this screens ============

import PropTypes from "prop-types";

// =========================================================================


// ============ import actions support library ============================= //

import { Actions } from "react-native-router-flux";

// =========================================================================

// ============ import ui support libraries ============================= //

import { TextField } from 'react-native-material-textfield';
import * as Progress from 'react-native-progress';
import { View, StyleSheet , Platform, ActivityIndicator, Image} from "react-native";

// =========================================================================


// ============= import general custom settings support methods/components ============== //

import Util from "../../util";
import reuseableFunctions from "../../reusableFunction/reuseableFunction";
import {Fonts , Metrics , Colors, Images} from "../../theme"
import {Text, Button, Spacer , ButtonView} from "../../components"
import { USER_ENTITY_ID } from "../../constants";

// ====================== import  styling for this screen ============================== //

import styles from "./styles";

// =======================================================================================

// =============== import user signin request action ======================== //

import { request } from "../../actions/SignIn";

// ==========================================================================

class Login extends Component {

 // ========== getting request props as required =============================

  static propTypes = {
    request: PropTypes.func.isRequired
  };
  
// ==================================================================================

// ===== Defining state params initially in constructor b/c it will serve first =====
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      secureTextEntry: true
    };
  }

// ==================================================================================
  
  email;
  password;


  _onAccessoryPress = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  };

  _renderPasswordAccessory = () => {
    const { secureTextEntry } = this.state;

    const name = "show?";

    return (
    // uncomment if accessory should be a text on password field

          // <Text
          //   onPress={() => this._onAccessoryPress()}
          //   style={{
          //     // color: "primary",
          //     fontSize: Fonts.size.normal,
          //     fontFamily: Fonts.type.medium
          //   }}
          // >
          //   {name}
          // </Text>
    // ============================================================

      <ButtonView onPress={() => this._onAccessoryPress()}>
      <Image style={styles.securityImage} source={Images.security}/>
      </ButtonView>
    );
  };


  _onFocus = () => {
    const { errors = {} } = this.state;

    for (const name in errors) {
      const ref = this[name];

      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }

    this.setState({ errors });
  };

  _renderActivityIndicator() {
    if (this.props.user.isFetching) {
      return (
        <View style={{ position: "absolute", right: Metrics.baseMargin }}>
          <ActivityIndicator animating color="white" size="small" />
        </View>
      );
    }
    return null;
  }

  _onLogin = () => {
    const { email, password } = this.state;
    if (_.isEmpty(email)) {
      reuseableFunctions.showAlert("Error", "Email required");
      setTimeout(() => {
        this.email.focus();
      }, 500);
    } else if (!Util.isEmailValid(email)) {
      reuseableFunctions.showAlert("Error", "Invalid Email");
      setTimeout(() => {
        this.email.focus();
      }, 500);
    } else if (_.isEmpty(password)) {
      reuseableFunctions.showAlert("Error", "Password required");
      setTimeout(() => {
        this.password.focus();
      }, 500);
    } else if (password.length < 6) {
      reuseableFunctions.showAlert(
        "Error",
        "Password length must be greater than 6"
      );
      setTimeout(() => {
        this.password.focus();
      }, 500);
    } else {
      const payload = {
        entity_type_id: USER_ENTITY_ID,
        login_id: email,
        password,
        device_type: Util.getPlatform()
      };
      this.props.request(payload);
    }
  };


  render() {

  // ===================== GETTING STATE PARAMS =========================== //

    const { email, password, errors, secureTextEntry } = this.state;

 // ==========================================================================

    return (
      <View style={styles.container}>
      <View style={styles.fieldView}>
      <Text size="xxLarge" color="primary" type="black">LOG IN</Text>
        <TextField
        ref={ref => {
          this.email = ref;
        }}
        value={email}
        onFocus={this._onFocus}
        onChangeText={value => this.setState({ email: value })}
        onSubmitEditing={() => this.password.focus()}
        returnKeyType="next"
        label="Email"
        error={errors.email}
        title=" "
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        enablesReturnKeyAutomatically
        labelStyle={{
          color: Colors.text.tertiary,
          fontFamily: Fonts.type.medium,
          fontSize: Fonts.size.normal
        }}
        labelFontSize={Fonts.size.xSmall}
        tintColor={Colors.text.primary}
        textColor={Colors.text.primary}
        style={{
          fontFamily: Fonts.type.medium,
          fontSize: Fonts.size.normal
        }}
      />
      <TextField
      labelStyle={{
        color: Colors.text.tertiary,
        fontFamily: Fonts.type.medium,
        fontSize: Fonts.size.normal
      }}
      labelFontSize={Fonts.size.xSmall}
      tintColor={Colors.text.primary}
      textColor={Colors.text.primary}
      style={{
        fontFamily: Fonts.type.medium,
        fontSize: Fonts.size.normal
      }}
      label="Password"
      renderAccessory={this._renderPasswordAccessory}
      ref={ref => {
        this.password = ref;
      }}
      value={password}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      autoCorrect={false}
      enablesReturnKeyAutomatically
      returnKeyType="next"      
      onFocus={this._onFocus}
      onChangeText={value => this.setState({ password: value })}
      onSubmitEditing={this._onLogin}
      returnKeyType="done"
      error={errors.password}
      maxLength={30}
    />
      </View>
      <View style={styles.buttonView}>
      <ButtonView style={styles.button} onPress={this._onLogin}>
      <Text color="secondary" type="book" size="large">Login</Text>
      {this._renderActivityIndicator()}
      </ButtonView>
      <ButtonView style={[styles.button,styles.button2]} onPress={()=>Actions.signup()}>
      <Text color="secondary" type="book" size="large">SignUp</Text>
      </ButtonView>
      </View>
      <View style={styles.progressView}>
      <Progress.Bar color={Colors.tertiary} progress={0.5} width={200} />
      </View>
      <Spacer />
      </View>
    );
  }
}

// map user signin request

const mapStateToProps = ({ user }) => ({
  user
});

// =========================================================================


// register user signin actions

const actions = { request };

// =========================================================================

export default connect(mapStateToProps, actions)(Login);
