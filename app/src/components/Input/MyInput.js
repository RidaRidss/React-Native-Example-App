// @flow
import _ from "lodash";
import util from "../../util";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Fonts, Colors, Metrics } from "../../theme";

import {
  Text,
  View,
  Animated,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";

const PADDING = 16;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end"
  },
  labelContainer: {
    position: "absolute"
  },
  textInput: {
    padding: 0
  }
});

export default class MyInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["normal", "email", "phone"]),
    label: PropTypes.string.isRequired,
    labelStyle: Text.propTypes.style,
    labelSize: PropTypes.oneOf(_.keys(Fonts.size)),
    labelType: PropTypes.oneOf(_.keys(Fonts.type)),
    labelColor: PropTypes.oneOf(_.keys(Colors.text)),

    inputStyle: Text.propTypes.style,
    inputSize: PropTypes.oneOf(_.keys(Fonts.size)),
    inputType: PropTypes.oneOf(_.keys(Fonts.type)),
    inputColor: PropTypes.oneOf(_.keys(Colors.text)),
    textAlign: PropTypes.oneOf(["left", "center", "right"]),

    height: PropTypes.number,
    errorColor: PropTypes.string,
    normalColor: PropTypes.string,
    successColor: PropTypes.string,
    containerStyle: PropTypes.object
  };

  static defaultProps = {
    type: "normal",
    labelType: "base",
    labelSize: "normal",
    labelColor: "primary",
    labelStyle: Text.defaultProps.style,

    textAlign: "left",
    inputType: "base",
    inputSize: "normal",
    inputColor: "primary",
    inputStyle: {
      ...Text.defaultProps.style,
      left: 0
    },

    errorColor: Colors.error,
    normalColor: Colors.normal,
    successColor: Colors.success,
    height: Metrics.defaultUIHeight,
    containerStyle: {
      borderBottomWidth: 2,
      borderColor: Colors.normal
    }
  };

  constructor(props: Object) {
    super(props);

    const { value } = props;

    this.state = {
      hasError: false,
      isSuccess: false,
      focusedAnim: new Animated.Value(value ? 1 : 0)
    };
  }

  state = {};

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  _onBlur = event => {
    if (!this.props.value) {
      this._toggle(false);
    }

    const { type, value, onBlur } = this.props;
    if (value && type === "email") {
      const validate = util.validateEmail(value);
      this.setState({
        hasError: !validate,
        isSuccess: validate
      });
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  _onFocus = event => {
    this._toggle(true);

    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  };

  _toggle(isActive) {
    const { animationDuration, easing, useNativeDriver } = this.props;
    this.isActive = isActive;
    Animated.timing(this.state.focusedAnim, {
      toValue: isActive ? 1 : 0,
      duration: animationDuration,
      easing,
      useNativeDriver
    }).start();
  }

  isSuccess() {
    const { type, value } = this.props;
    if (value && type === "email") {
      return util.validateEmail(value);
    }
    return true;
  }

  hasError(flag: ?boolean = undefined) {
    if (flag !== undefined) {
      this.hasError = flag;
    }
    return this.hasError;
  }

  isValidate() {
    const { type, value } = this.props;
    if (value && type === "email") {
      return util.validateEmail(value);
    }

    return (value && false) || true;
  }

  render() {
    const { focusedAnim, hasError, isSuccess } = this.state;

    const {
      value,
      type,
      label,
      labelStyle,
      labelSize,
      labelType,
      labelColor,

      textAlign,
      inputType,
      inputSize,
      inputStyle,
      inputColor,

      height,
      errorColor,
      normalColor,
      successColor,
      containerStyle,

      ...rest
    } = this.props;

    const _labelStyle = StyleSheet.flatten([
      {
        color: Colors.text[labelColor],
        fontFamily: Fonts.type[labelType],
        backgroundColor: Colors.transparent,
        fontSize: Metrics.generatedFontSize(Fonts.size[labelSize])
      },
      labelStyle
    ]);

    const _inputStyle = StyleSheet.flatten([
      {
        textAlign,
        fontWeight: "normal",
        color: Colors.text[inputColor],
        fontFamily: Fonts.type[inputType],
        backgroundColor: Colors.transparent,
        fontSize: Metrics.generatedFontSize(Fonts.size[inputSize])
      },
      inputStyle
    ]);

    let borderColor = normalColor;
    if (value) {
      if (isSuccess || this.isValidate()) {
        borderColor = successColor;
      } else if (hasError) {
        borderColor = errorColor;
      }
    }

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            borderColor,
            height: height + PADDING
          }
        ]}
      >
        <TextInput
          style={[
            styles.textInput,
            _inputStyle,
            {
              height
            }
          ]}
          {...rest}
          value={value}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          underlineColorAndroid="transparent"
        />
        <TouchableWithoutFeedback onPress={this._onFocus}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                opacity: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0, 1]
                }),
                top: focusedAnim.interpolate({
                  inputRange: [0, 0.5, 0.51, 1],
                  outputRange: [22, 22, 0, 0]
                })
              }
            ]}
          >
            <Text style={_labelStyle}>{label}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
