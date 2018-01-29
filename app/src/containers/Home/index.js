// @flow
import { connect } from "react-redux";
import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { View, StyleSheet , Platform} from "react-native";
import { Actions } from "react-native-router-flux";

import { TextField } from 'react-native-material-textfield';

import {Fonts , Metrics , Colors} from "../../theme"
import Util from "../../util";
import reuseableFunctions from "../../reusableFunction/reuseableFunction";
import {Text, Button} from "../../components"
import styles from "./styles";

  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
      'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
  });

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      secureTextEntry: true
    };
  }

  email;
  password;

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

  _onSubmit = () => {
    const errors = {};
    let hasErrors = true;
    ["email", "password"].forEach(name => {
      const value = this[name].value();

      if (!value || ("email" === name && !Util.isEmailValid(value))) {
        errors[name] = "Invalid Email";
      } else if (!value || ("password" === name && value.length < 6)) {
        errors[name] = "Too short";
      } else {
        hasErrors = false;
      }
    });

    this.setState({ errors });
    if (!hasErrors) {
     alert("successfully Login");
    }
  };



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
        entity_type_id: 5,
        login_id: email,
        password,
        device_type: Util.getPlatform()
      };
      alert("successfully Login");
      // this.props.request(payload);
    }
  };


  render() {
    const { email, password, errors, secureTextEntry } = this.state;
    return (
      <View style={styles.container}>
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
      <Button onPress={this._onLogin} style={styles.button} title="Next" type={Fonts.type.black} size={40} background={Colors.tertiary} color="white">Next</Button>
      </View>
    );
  }
}

const mapStateToProps = ({ route }) => ({
  route
});

const actions = {};

export default connect(mapStateToProps, actions)(Home);
