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

import { TextField } from "react-native-material-textfield";
import * as Progress from "react-native-progress";
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Keyboard,
  Image
} from "react-native";

// =========================================================================

// ============= import general custom settings support methods/components ============== //

import Util from "../../util";
import reuseableFunctions from "../../reusableFunction/reuseableFunction";
import { Fonts, Metrics, Colors, Images } from "../../theme";
import { Text, Button, Spacer, ButtonView } from "../../components";
import { USER_ENTITY_ID } from "../../constants";

// ====================== import  styling for this screen ============================== //

import styles from "./styles";

// =======================================================================================

// =============== import user signup request action ======================== //

import { request } from "../../actions/SignUp";

// ==========================================================================

class Signup extends Component {
  // ========== getting request props as required =============================

  static propTypes = {
    request: PropTypes.func.isRequired
  };

  // ==================================================================================

  // ===== Defining state params initially in constructor b/c it will serve first =====

  constructor(props) {
    super(props);
    this.state = {
      fullNameLabel: "Full Name",
      fullName: "",
      emailLabel: "Email",
      email: "",
      password: "",
      confirmPassword: "",
      errors: "",
      allFieldsFull: false,
      secureTextEntry: true,
      // fadeAnim: new Animated.Value(0.5),
      persistFlagKeyboard: true
    };
  }

  // ================================ KEYBOARD BEHAVIOURS ==================================================

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    console.log("Keyboard Shown");
  }

  _keyboardDidHide() {
    console.log("Keyboard Hidden");
  }

  checkPersistKeyboardFlag = () => {
    if (this.state.persistFlagKeyboard) {
      this.setState({ persistFlagKeyboard: false });
    }
  };

  // ===============================================================================================================

  email;
  password;

  // ================================ FOCUSSING FIELDS VALIDATION ==================================================

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

  // =======================================================================================================

  // ================================ VALIDATONS TO DISPLAY SUBMIT BUTTTON ON FIELDS CHANGE ========================================

  _onNameChange = fullName => {
    if (fullName) {
      this.setState({ fullName, flag1: true });
      this._content();
    } else {
      this.setState({ fullName, flag1: false });
      this._content();
    }
  };
  _onEmailChange = email => {
    if (email) {
      this.setState({ email, flag2: true });
      this._content();
    } else {
      this.setState({ email, flag2: false });
      this._content();
    }
  };

  _onPasswordChange = password => {
    if (password) {
      this.setState({ password, flag3: true });
      this._content();
    } else {
      this.setState({ password, flag3: false });
      this._content();
    }
  };
  _onConfirmPasswordChange = confirmPassword => {
    if (confirmPassword) {
      this.setState({ confirmPassword, flag4: true });
      this._content();
    } else {
      this.setState({ confirmPassword, flag4: false });
      this._content();
    }
  };

  // ===================================================================================================================

  // ==================================== FORM VALIDATIONS ==============================================================

  _submitForm = () => {
    const { email, password, fullName, confirmPassword } = this.state;
    if (_.isEmpty(fullName)) {
      reuseableFunctions.showAlert("Error", "Full Name is Required");
      setTimeout(() => {
        this.name.focus();
      }, 500);
    } else if (_.isEmpty(email)) {
      reuseableFunctions.showAlert("Error", "Email is Required");
      setTimeout(() => {
        this.email.focus();
      }, 500);
    } else if (!Util.isEmailValid(email)) {
      reuseableFunctions.showAlert("Error", "Email is Invalid");
      setTimeout(() => {
        this.email.focus();
      }, 500);
    } else if (_.isEmpty(password)) {
      reuseableFunctions.showAlert("Error", "Password is Required");
      setTimeout(() => {
        this.passwordRef[0].focus();
      }, 500);
    } else if (_.isEmpty(confirmPassword)) {
      reuseableFunctions.showAlert("Error", "Confirm password is Required");
      setTimeout(() => {
        this.passwordRef[1].focus();
      }, 500);
    } else if (confirmPassword !== password) {
      reuseableFunctions.showAlert(
        "Error",
        "Password & Confirm Password Mismatch"
      );
      setTimeout(() => {
        this.passwordRef[1].focus();
      }, 500);
    } else {
      setTimeout(() => {
        const payload = {
          entity_type_id: USER_ENTITY_ID,
          is_auth_exists: 0,
          role_id: "",
          email,
          password,
          name: fullName,
          dob: "",
          gender: "",
          preference: "",
          latitude: "",
          longitude: "",
          is_notification: 1,
          running_level: "",
          start_time: "",
          end_time: "",
          speed: "",
          country_id: "",
          state_id: "",
          mobile_no: "",
          device_type: Util.getPlatform(),
          device_udid: "",
          device_token: "",
          user_type: "user"
        };
        this.props.request(payload);
      }, 800);
      setTimeout(() => {
        Actions.detail();
      }, 900);
    }
  };

  // ================================ DISPLAY SUBMIT BUTTTON DEFINITION ON FIELDS CHANGE ========================================

  _content = () => {
    if (
      this.state.flag1 &&
      this.state.flag2 &&
      this.state.flag3 &&
      this.state.flag4 &&
      this.checkPersistKeyboardFlag
    ) {
      return (
        <View style={styles.buttonView}>
          <ButtonView
            style={[styles.button, styles.button2]}
            onPress={this._submitForm}
          >
            <Text color="secondary" type="book" size="large">
              Sign Up
            </Text>
            {this._renderActivityIndicator()}
          </ButtonView>
        </View>
      );
    } else {
      return null;
    }
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

  // ===================================================================================================================

  // ================================ DISPLAY FORM FIELDS GENERIC DEFINITION ========================================

  _renderFullNameField() {
    return (
      <View style={{ marginTop: Metrics.ratio(4) }}>
        <TextField
          labelTextStyle={{
            color: Colors.text.tertiary
          }}
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
          label={this.state.fullNameLabel}
          ref={ref => {
            this.name = ref;
          }}
          returnKeyType="next"
          keyboardShouldPersistTaps={this.state.persistFlagKeyboard}
          autoCorrect={false}
          value={this.state.fullName}
          enablesReturnKeyAutomatically
          onFocus={this._onFocus}
          onChangeText={this._onNameChange}
          onSubmitEditing={() => {
            this.email.focus();
          }}
          keyboardType="email-address"
          maxLength={30}
        />
      </View>
    );
  }
  _renderEmailField() {
    return (
      <View style={{ marginTop: Metrics.ratio(4) }}>
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
          keyboardShouldPersistTaps={this.state.persistFlagKeyboard}
          label={this.state.emailLabel}
          ref={ref => {
            this.email = ref;
          }}
          returnKeyType="next"
          value={this.state.email}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically
          onFocus={this._onFocus}
          onChangeText={this._onEmailChange}
          onSubmitEditing={() => this.passwordRef[0].focus()}
          keyboardType="email-address"
          maxLength={30}
        />
      </View>
    );
  }

  passwordRef = [];

  _renderPassFields(label, flag: number) {
    const { password, confirmPassword } = this.state;
    return (
      <View style={{ marginTop: Metrics.ratio(4) }}>
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
          keyboardShouldPersistTaps={this.state.persistFlagKeyboard}
          label={label}
          onChangeText={
            !flag ? this._onPasswordChange : this._onConfirmPasswordChange
          }
          ref={ref => {
            flag ? (this.passwordRef[1] = ref) : (this.passwordRef[0] = ref);
          }}
          secureTextEntry={true}
          value={!flag ? password : confirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType={flag ? "done" : "next"}
          enablesReturnKeyAutomatically
          onFocus={this._onFocus}
          onSubmitEditing={() => {
            flag
              ? Keyboard.dismiss()
              : //this._submitForm()
                this.passwordRef[1].focus();
          }}
          // error={errors.password}
          maxLength={30}
        />
      </View>
    );
  }

  // ============================= render password accessory definition ===============================

  _renderPasswordAccessory = () => {
    const { secureTextEntry } = this.state;

    const name = "show?";

    return (
      // uncomment if accessory should be an image on password field

      // <ButtonView onPress={() => this._onAccessoryPress()}>
      // <Image style={styles.securityImage} source={Images.security}/>
      // </ButtonView>

      // ============================================================

      <Text
        onPress={() => this._onAccessoryPress()}
        style={{
          // color: "primary",
          fontSize: Fonts.size.normal,
          fontFamily: Fonts.type.medium
        }}
      >
        {name}
      </Text>
    );
  };

  _onAccessoryPress = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    });
  };

  // ==========================================================================

  render() {
    // ===================== GETTING STATE PARAMS =========================== //

    const {
      email,
      password,
      confirmPassword,
      errors,
      secureTextEntry
    } = this.state;

    // ==========================================================================

    return (
      <View style={styles.container}>
        <View style={styles.fieldView}>
          <Text size="xxLarge" color="primary" type="black">
            SIGN UP
          </Text>

          {this._renderFullNameField()}

          {this._renderEmailField(this.state.email)}

          {this._renderPassFields("Password", false)}

          {this._renderPassFields("Confirm Password", true)}
        </View>
        {!this.state.allFieldsFull && this._content()}
        <View style={styles.progressView}>
          <Progress.Bar color={Colors.secondary} progress={0.3} width={200} />
        </View>
        <Spacer />
      </View>
    );
  }
}

// map user signup request

const mapStateToProps = ({ user }) => ({
  user
});

// =========================================================================

// register user signup actions

const actions = { request };

// =========================================================================

export default connect(mapStateToProps, actions)(Signup);
