import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, Image, TextInput, TouchableNativeFeedback } from "react-native";

import styles from "./styles";
import { Metrics, Images } from "../../../theme";
import { ButtonView } from "../../../components";
import MediaPicker from "../../../services/MediaPicker";

const MIN_INPUT_HEIGHT = 40;
const MAX_INPUT_HEIGHT = 100;

export default class Comment extends Component {
  static propTypes = {
    text: PropTypes.string,
    multiline: PropTypes.bool,
    onComment: PropTypes.func,
    onAttach: PropTypes.func,
    onChangeText: PropTypes.func,
    placeholder: PropTypes.string,
    textInputProps: PropTypes.object
  };

  static defaultProps = {
    text: "",
    multiline: true,
    onComment: () => {},
    onAttach: () => {},
    onChangeText: () => {},
    placeholder: "Write Message",
    textInputProps: {}
  };

  state = {
    text: this.props.text,
    inputHeight: MIN_INPUT_HEIGHT,
    typingDisabled: false
  };

  _onContentSizeChange = ({ nativeEvent }) => {
    const contentSize = nativeEvent.contentSize;

    if (!this.contentSize || this.contentSize.height !== contentSize.height) {
      this.contentSize = contentSize;
      this.setState({
        inputHeight: Math.max(
          MIN_INPUT_HEIGHT,
          Math.min(MAX_INPUT_HEIGHT, this.contentSize.height)
        )
      });
    }
  };

  _onChangeText = text => {
    this.setState(
      {
        text
      },
      () => {
        if (this.props.onChangeText) {
          this.props.onChangeText(text);
        }
      }
    );
  };

  _onComment = () => {
    const text = this.state.text;
    this.setState(
      {
        text: ""
      },
      () => {
        if (this.props.onComment) {
          this.props.onComment(text);
        }
      }
    );
  };

  _onAttach = () => {
    MediaPicker.showImagePicker(response => {
      if (response.uri) {
        const text = this.state.text;
        this.setState(
          {
            text: ""
          },
          () => {
            this.props.onAttach && this.props.onAttach(text, response.uri);
          }
        );
      }
    });
  };

  render() {
    const background = TouchableNativeFeedback.SelectableBackgroundBorderless;
    const { multiline, placeholder, textInputProps } = this.props;
    const { text } = this.state;

    return (
      <View
        style={[
          styles.container,
          { height: this.state.inputHeight + Metrics.smallMargin * 2 }
        ]}
      >
        <TextInput
          value={text}
          multiline={multiline}
          placeholder={placeholder}
          style={[styles.input, { height: this.state.inputHeight }]}
          underlineColorAndroid="transparent"
          {...textInputProps}
          onChangeText={this._onChangeText}
          onContentSizeChange={this._onContentSizeChange}
        />
        <View style={styles.button}>
          <ButtonView onPress={this._onAttach} background={background}>
            <Image source={Images.cameraGrey} />
          </ButtonView>
        </View>
        <View style={styles.button}>
          <ButtonView onPress={this._onComment} background={background}>
            <Image source={Images.send} />
          </ButtonView>
        </View>
      </View>
    );
  }
}
