// @flow

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, ViewPropTypes } from "react-native";
import RNImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

import styles from "./styles";
import ButtonView from "../ButtonView";

const options = {
  title: "Select Image",
  takePhotoButtonTitle: "Camera",
  chooseFromLibraryButtonTitle: "Gallery",
  cancelButtonTitle: "cancel",
  quality: 0.2
};

export default class ImagePicker extends Component {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
      .isRequired,
    onImagePicked: PropTypes.func.isRequired,
    imageStyle: PropTypes.oneOfType([PropTypes.object, ViewPropTypes.style]),
    containerStyle: PropTypes.oneOfType([
      PropTypes.array,
      ViewPropTypes.style,
      PropTypes.object
    ])
  };

  static defaultProps = {
    imageStyle: styles.image,
    containerStyle: styles.container
  };

  _showImagePicker = () => {
    RNImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // console.log("User cancelled image picker");
      } else if (response.error) {
        // console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        // console.log("User tapped custom button: ", response.customButton);
      } else {
        ImageResizer.createResizedImage(response.uri, 800, 600, "JPEG", 100)
          .then(resizedImage => {
            this.props.onImagePicked(resizedImage);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  render() {
    return (
      <ButtonView
        style={this.props.containerStyle}
        onPress={this._showImagePicker}
      >
        <Image style={this.props.imageStyle} source={this.props.source} />
      </ButtonView>
    );
  }
}
