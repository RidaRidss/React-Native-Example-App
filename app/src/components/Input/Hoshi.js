import React from "react";
import { Colors, Fonts, Metrics } from "../../theme";
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ScrollView,
  Platform
} from "react-native";
import PropTypes from "prop-types";

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

  render() {
    const {
      label,
      style: containerStyle,
      inputStyle,
      labelStyle,
      maskColor,
      height: inputHeight
    } = this.props;
    const { width, focusedAnim, value } = this.state;

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            height: inputHeight + 10
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
                  inputRange: [0, 1],
                  outputRange: [20, -2]
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
          style={{
            marginLeft,
            // lineHeight: Platform.OS === "android" ? 22 : 0,
            position: "relative",
            color: Colors.text.secondary,
            fontSize: Fonts.size.large,
            fontFamily: Fonts.type.base,
            width,
            height: inputHeight,
            top: 18,
            left: -4
          }}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={"transparent"}
          autoCapitalize="sentences"
        />
      </View>
    );
  }

  focus = () => {
    this.refs.input.focus();
  };
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
    lineHeight: Platform.OS === "android" ? 22 : 0,
    position: "relative",
    color: Colors.text.secondary,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.base
  }
});
