import React, { PropTypes } from "react";
import { Colors, Fonts } from "../../../src/theme";
import {
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from "react-native";

//import BaseInput from "./BaseInput";

const PADDING = 16;

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
            //height: inputHeight + PADDING,
            height: inputHeight + 10
            //marginTop: -5
            // bottom: 2
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
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
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
              height: inputHeight,
              top: 15,
              left: -4
            }
          ]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={"transparent"}
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
    position: "absolute",
    color: Colors.text.secondary,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.base
  }
});
