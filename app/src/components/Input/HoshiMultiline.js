import React from "react";
import PropTypes from "prop-types";
import { Colors, Fonts, Metrics } from "../../theme";
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform
} from "react-native";

import BaseInput from "./BaseInput";

const PADDING = 16;
const marginLeft = Platform.OS === "ios" ? 5 * Metrics.ratio : 0;

export default class Hoshi extends BaseInput {
  static propTypes = {
    /*
     * this is used to set backgroundColor of label mask.
     * this should be replaced if we can find a better way to mask label animation.
     */
    maskColor: PropTypes.string,
    height: PropTypes.number
  };

  static defaultProps = {
    height: 44
  };

  offsetList = 220; //* Metrics.ratio; //this.props; // || 200;

  render() {
    const {
      label,
      style: containerStyle,
      myRef,
      inputStyle,
      labelStyle,
      maskColor,
      height: inputHeight
    } = this.props;
    const { width, focusedAnim, value, multilineInputHeight } = this.state;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: multilineInputHeight + 2 * Metrics.ratio
          }
        ]}
        onLayout={this._onLayout}
      >
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                opacity: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [3, 0, 3]
                }),
                top: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 0.51, 1],
                  outputRange: [20, 20, -2, -2]
                })
              }
            ]}
          >
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[
            styles.textInput,
            inputStyle,
            {
              width,
              height: multilineInputHeight,
              // Platform.OS === "android"
              //   ? multilineInputHeight
              //   : 30 * Metrics.ratio,
              top:
                Platform.OS === "android"
                  ? 12 * Metrics.ratio
                  : 22 * Metrics.ratio,
              left: -4 * Metrics.ratio
            }
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={"transparent"}
          multiline
          autoCapitalize="sentences"
          blurOnSubmit={false}
          onContentSizeChange={({ nativeEvent }) => {
            let threshold = 0;
            if (
              this.state.multilineInputHeight > nativeEvent.contentSize.height
            ) {
              threshold = -35;
              //this.offsetList - 25;
            } else if (
              this.state.multilineInputHeight < nativeEvent.contentSize.height
            ) {
              threshold = 30;
            }
            this.setState(
              {
                multilineInputHeight: nativeEvent.contentSize.height
              },
              () => {
                if (myRef) {
                  myRef.scrollTo({
                    y: this.offsetList,
                    animated: true
                  });
                  this.offsetList += threshold;
                }
              }
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    position: "absolute"
  },
  label: {
    color: Colors.text.primary,
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.base
  },
  textInput: {
    marginLeft,
    position: "absolute",
    color: Colors.text.secondary,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.base
  }
});
