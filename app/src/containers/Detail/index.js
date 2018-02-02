// @flow

// ============== import redux libraries to connect redux =============== //

import { connect } from "react-redux";
import React, { Component, NativeAppEventEmitter, NativeModules } from "react";

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

import ImageResizer from "react-native-image-resizer";
import * as Progress from "react-native-progress";
import { View, StyleSheet, Platform, ActivityIndicator } from "react-native";
import MapView from "react-native-maps";

// =========================================================================

// ============= import general custom settings support methods/components ============== //

import Util from "../../util";
import reuseableFunctions from "../../reusableFunction/reuseableFunction";
import { Fonts, Metrics, Colors, Images } from "../../theme";
import { Text, Button, Spacer, ButtonView } from "../../components";
import {
  RADIUS_DISTANCE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  mapStyle
} from "../../constants";

// ====================== import  styling for this screen ============================== //

import styles from "./styles";

// =======================================================================================

// =============== import user edit request action ======================== //

import { request as imageUploadRequest } from "../../actions/AttachmentFile";
import { request as userEditRequest } from "../../actions/UserEdit";

// ==========================================================================

// =============== import user edit request ======================== //

import { API_USER_EDIT } from "../../config/WebService";

// ==========================================================================

// =============== importing xmpp for chat integration ======================

// import XMPP from "react-native-xmpp";
// import XmppService from "../../services/XmppService";

class Detail extends Component {
  // ========== getting request props as required =============================

  static propTypes = {
    userLocation: PropTypes.object.isRequired,
    imageUploadRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userEditRequest: PropTypes.func.isRequired,
    attachmentFile: PropTypes.object.isRequired
  };

  // ==================================================================================

  // ===== Defining state params initially in constructor b/c it will serve first =====

  constructor(props) {
    super(props);

    const data = props.user.data;

    this.state = {
      name: "",
      email: "",
      password: "",
      errors: {},
      initialRegion: {},
      moveToUserLocation: true,
      // image: this._getGallery(data),
      // imageChanged: false
      // dob: undefined,
      // gender: undefined,
      // selectedGender: this._getGender(data),
      // genderChangedByUser: false,
      // currentDate: Util.getCurrentDayDate(),
      secureTextEntry: true
    };
  }

  email;
  password;

  // ============= getting user data from api =============== //

  _user() {
    return this.props.user.data;
  }

  // ============= submit edit user request form =============== //

  // _onSubmitForm = () => {
  //   const data = this.props.data;
  //   const files = [this.state.image];
  //   if (this.state.image && this.state.imageChanged) {
  //     this.props.imageUploadRequest(
  //       files,
  //       0,
  //       API_USER_EDIT,
  //       this._getUpdatePayload()
  //     );
  //   } else {
  //     this.props.userEditRequest(this._getUpdatePayload());
  //   }
  // };

  _showPicker = () => {
    MediaPicker.showImagePicker(response => {
      if (response.uri) {
        ImageResizer.createResizedImage(response.uri, 800, 600, "JPEG", 100)
          .then(({ uri }) => {
            this.setState({
              image: uri,
              imageChanged: true
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
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

  render() {
    // ===================== checking empty user data =========================== //

    if (_.isEmpty(this._user())) {
      return null;
    }

    // ================================================================= //

    // ===================== user data params =========================== //

    const { auth, attributes, gallery } = this._user();
    const { name, entity_auth_id } = auth;
    // ================================================================= //

    const { email, password, errors, secureTextEntry, image } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.fieldView}>
          <Text size="xxLarge" color="primary" type="black">
            User
          </Text>
          <Text size="xxLarge" color="primary" type="black">
            {name}
          </Text>
        </View>

        <View style={styles.buttonView}>
          <ButtonView
            style={styles.button}
            onPress={() => {
              // ================== xmpp code here =========================
              // XmppService.connect();
              // ===========================================================
            }}
          >
            <Text color="secondary" type="book" size="large">
              Let's Chat
            </Text>
            {this._renderActivityIndicator()}
          </ButtonView>
        </View>
        <View style={styles.progressView}>
          <Progress.Bar color={Colors.tertiary} progress={0.8} width={200} />
        </View>
        <Spacer />
      </View>
    );
  }

  // =================== edit user info request payload =============== //

  // _getUpdatePayload = () => {
  //   const {
  //     dob,
  //     selectedGender,
  //   } = this.state;

  //   const payload = {
  //     entity_type_id: 5,
  //     entity_id: this._user().entity_id,
  //     name: this._user().auth.name,
  //     dob: dob,
  //     gender: Util.getGenderStatus(selectedGender)
  //   };
  //   return payload;
  // };

  // ================================================================= //

  // ================= geting field values ===================== //

  // _getGallery = data => {
  //   if (
  //     data &&
  //     data.attributes &&
  //     data.attributes.gallery &&
  //     data.attributes.gallery.length
  //   ) {
  //     return data.attributes.gallery[0].file;
  //   } else if (data && data.attributes && data.attributes.fb_image) {
  //     return data.attributes.fb_image;
  //   }
  //   return Images.profileplaceholder;
  // };

  // _getDate = data => {
  //   if (data && data.dob === dateStatus) {
  //     return Util.getCurrentDayDate();
  //   }
  //   return data.dob;
  // };
  // _getGender = data => {
  //   if (data && data.gender && data.gender.value) {
  //     return GENDER[data.gender.value];
  //   } else if (
  //     data &&
  //     data.attributes &&
  //     data.attributes.gender &&
  //     data.attributes.gender.detail
  //   ) {
  //     return GENDER[+data.attributes.gender.detail.value];
  //   }
  //   return undefined;
  // };

  // ================================================================= //

  // ======================== validating fields ====================== //

  // _validateFields = () => {
  //   if (!this.state.image) {
  //     reusableFunction.showAlert("Error", "profile pic required");
  //   } else if (!this.state.selectedGender) {
  //     reusableFunction.showAlert("Error", "Select gender");
  //   } else if (!this.state.dob) {
  //     reusableFunction.showAlert("Error", "Select date of birth");
  //   } else if (Util.dateValidation()) {
  //     reusableFunction.showAlert("Error", "Check Date of Birth");
  //   } else {
  //     this._onSubmitForm();
  //   }
  // };

  // ================================================================= //
}

const mapStateToProps = state => ({
  // ============= maping user & userLocation no  need to import its reducer , this will map by reducer , & also mapping attachment file from reducer ============= //

  user: state.user,
  attachmentFile: state.attachmentFile,
  userLocation: state.userLocation

  // ================================================================= //
});

const actions = {
  // ============= registering image upload & user edit request actions  ============= //
  imageUploadRequest,
  userEditRequest
};

// ================================================================= //

export default connect(mapStateToProps, actions)(Detail);

// <MapView
//   style={styles.map}
//   maxZoomLevel={10}
//   provider="google"
//   loadingEnabled
//   ref={ref => {
//     this.map = ref;
//   }}
//   showsBuildings={false}
//   showsUserLocation
//   customMapStyle={mapStyle}
//   image={Images.navigate}
//   toolbarEnabled={false}
//   initialRegion={{
//     longitude: -73.98113060742617,
//     latitudeDelta: 0.0272457629830285,
//     latitude: 40.76143331655857,
//     longitudeDelta: 0.030134618282318115
//     }}
// />
