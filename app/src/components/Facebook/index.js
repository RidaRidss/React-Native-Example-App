// @flow
import Util from "../../util";
import { connect } from "react-redux";
import { Image, Platform, Alert } from "react-native";
import React, { Component } from "react";
import { ButtonView, Text } from "../../components";
import { request } from "../../actions/UserActions";
import { Actions } from "react-native-router-flux";
import { API_USER_SOCIAL_LOGIN } from "../../config/WebService";
import locationUtils from "../../util/locationUtils";

import { Images, Metrics } from "../../theme";
import {
  FACEBOOK_PERMISSIONS,
  profileRequestConfig
} from "../../config/SocialLogin";
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import Utils from "../../util";

import styles from "./styles";

class Facebook extends Component {
  _onPress = () => {
    // Actions.home();
    // return;
    if (this.props.networkInfo.isNetworkConnected === true) {
      LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSIONS).then(
        login => {
          if (!login.isCancelled) {
            const { onFBLoggedIn, getNativeObject } = this.props;
            AccessToken.getCurrentAccessToken().then(data => {
              const responseCallback = (error, result) => {
                if (error) {
                  //TODO: callback; false
                  console.log(error);
                } else {
                  alert("facebook");
                  const payload = {
                    latitude: Util.getLocation().latitude,
                    longitude: Util.getLocation().longitude,
                    name: result.name,
                    email: result.email,
                    platform_id: result.id,
                    entity_type_id: "users",
                    facebook_id: result.id,
                    facebook_cover: result.cover
                      ? result.cover.source
                      : "http://images.firstcovers.com/covers/i/its_easy_if_you_try-5332.jpg",
                    platform_type: "facebook",
                    device_type: Util.getPlatform(),
                    device_token: Util.getDeviceToken(),
                    device_udid: Util.getUserId(),
                    mobile_json: 1
                  };
                  // const payload = {
                  //   latitude: locationUtils.getLocation().latitude,
                  //   longitude: locationUtils.getLocation().longitude,
                  //   name: result.name,
                  //   email: result.email,
                  //   platform_id: result.id,
                  //   facebook_id: result.id,
                  //   social_image:
                  //     result.picture &&
                  //     result.picture.data &&
                  //     result.picture.data.url
                  //       ? result.picture.data.url
                  //       : "http://images.firstcovers.com/covers/i/its_easy_if_you_try-5332.jpg",
                  //   platform_type: "facebook",
                  //   device_type: Util.getPlatform(),
                  //   facebook_link: "www.facebook.com/" + result.id,
                  //   mobile_json: 1
                  // };
                  this.props.request(API_USER_SOCIAL_LOGIN, payload);
                  Actions.Chat();
                  // if (onFBLoggedIn) {
                  //   if (getNativeObject) {
                  //     onFBLoggedIn(result);
                  //   } else {
                  //     onFBLoggedIn(payload);
                  //   }
                  // }
                }
              };

              const profileRequest = new GraphRequest(
                "/me",
                profileRequestConfig(data.accessToken.toString()),
                responseCallback
              );

              new GraphRequestManager().addRequest(profileRequest).start();
            });
          }
        },
        error => {
          console.log("Login fail with error: ", error);
        }
      );
    } else {
      Utils.noInternetMessage();
    }
  };

  render() {
    return (
      <ButtonView
        publishPermissions={["publish_actions"]}
        onLoginFinished={(error, result) => {
          if (error) {
            alert("Login failed with error: " + result.error);
          } else if (result.isCancelled) {
            alert("Login was cancelled");
          } else {
            alert(
              "Login was successful with permissions: " +
                result.grantedPermissions
            );
          }
        }}
        onLogoutFinished={() => alert("User logged out")}
        style={styles.container}
        onPress={this._onPress}
      >
        <Image
          source={Images.facebook}
          style={{ marginLeft: Metrics.smallMargin }}
        />
        <Text
          color="tertiary"
          type="medium"
          style={{
            flex: 1,
            top: Platform.select({
              ios: -1 * Metrics.ratio,
              android: -2 * Metrics.ratio
            })
          }}
        >
          Connect with Facebook
        </Text>
      </ButtonView>
    );
  }
}

const mapStateToProps = state => ({
  networkInfo: state.networkInfo
});

const actions = {
  request
};

export default connect(mapStateToProps, actions)(Facebook);
