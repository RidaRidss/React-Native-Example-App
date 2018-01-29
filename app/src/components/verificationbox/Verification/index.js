// @flow
import { connect } from "react-redux";
import { View, Keyboard } from "react-native";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { Text, VerificationBox, ButtonView, Loading } from "../../components";
import styles from "./styles";
import Util from "../../util";
// import { request as verificationRequest } from "../../actions/UserActions";
import { API_ENTITY_AUTH_VERIFICATION } from "../../config/WebService";

class Verification extends Component {
  static propTypes = {
    verification_mode: PropTypes.string,
    // verificationRequest: PropTypes.func.isRequired,
    // user: PropTypes.object.isRequired
  };

  static defaultProps = {
    verification_mode: "signup"
  };

  componentWillMount() {
    Util.hideIQKeyboardManager();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.failure) {
      this.verificationBox.clear();
    }
  }

  componentWillUnmount() {
    Util.showIQKeyboardManager();
  }

  _resendCode = () => {
    /*this.verificationBox.clear();
    this.forceUpdate();
    alert("resend code");*/
  };

  _onComplete = verificationCode => {
    Keyboard.dismiss();
    const { user, verification_mode } = this.props;
    const payload = {
      entity_type_id: 11,
      verification_mode,
      mobile_no: user.data.auth.mobile_no,
      authy_code: verificationCode,
      verification_token: user.data.auth.verification_token,
      mobile_json: 1
    };
    // this.props.verificationRequest(API_ENTITY_AUTH_VERIFICATION, payload);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text color="primary" type="light" style={styles.headerText}>
          We have sent you an access code{"\n"} via SMS for Mobile number
          verifications
        </Text>

        <Text size="large" style={styles.digitLabel}>
          Enter 4 Digit Code
        </Text>
        <VerificationBox
          ref={ref => {
            this.verificationBox = ref;
          }}
          numberOfInputBoxs={4}
          onComplete={this._onComplete}
        />
        <ButtonView onPress={() => this._resendCode()}>
          <Text color="accent" size="xSmall" style={styles.resendCode}>
            RESEND CODE
          </Text>
        </ButtonView>
        <Loading loading={this.props.user.isFetching} />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  // user: store.user
});
// const actions = { verificationRequest };

export default connect(mapStateToProps, actions)(Verification);
