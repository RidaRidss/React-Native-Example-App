import { Component } from "react";

import {
  Platform,
  Easing,
  Animated,
  Text,
  View,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

import Util from "../../util";

export default class BaseInput extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    style: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
    inputStyle: Text.propTypes.style,
    labelStyle: Text.propTypes.style,
    easing: PropTypes.func,
    animationDuration: PropTypes.number,
    useNativeDriver: PropTypes.bool,

    editable: PropTypes.bool,

    /* those are TextInput props which are overridden
     * so, i'm calling them manually
     */
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);

    this._onLayout = this._onLayout.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this.focus = this.focus.bind(this);

    const value = props.value || props.defaultValue;

    this.state = {
      value,
      multilineInputHeight: Platform.select({
        ios: 33,
        android: 41
      }),
      focusedAnim: new Animated.Value(value ? 1 : 0)
    };
  }

  componentWillReceiveProps(newProps) {
    const newValue = newProps.value;
    if (newProps.hasOwnProperty("value") && newValue !== this.state.value) {
      this.setState({
        value: newValue
      });

      // animate input if it's active state has changed with the new value
      // and input is not focused currently.
      const isFocused = this.inputRef();
      if (!isFocused) {
        const isActive = Boolean(newValue);
        if (isActive !== this.isActive) {
          this._toggle(isActive);
        }
      }
    }
  }

  initialSize = 25;

  _onLayout(event) {
    this.setState({
      width: event.nativeEvent.layout.width
    });
  }

  _onChange(event) {
    let value = event.nativeEvent.text;

    if (Util.lineCounter(value) > 4) {
      value = this.state.value;
    }
    this.setState({
      value
    });

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  }

  _onBlur(event) {
    if (!this.state.value) {
      this._toggle(false);
    }

    const onBlur = this.props.onBlur;
    if (onBlur) {
      onBlur(event);
    }
  }

  _onFocus(event) {
    this._toggle(true);

    const onFocus = this.props.onFocus;
    if (onFocus) {
      onFocus(event);
    }
  }

  _toggle(isActive) {
    const {
      animationDuration = 500,
      easing = Easing.bezier(0.2, 1, 0.3, 1),
      useNativeDriver
    } = this.props;
    this.isActive = isActive;
    Animated.timing(this.state.focusedAnim, {
      toValue: isActive ? 1 : 0,
      duration: animationDuration,
      easing,
      useNativeDriver
    }).start();
  }

  // public methods

  inputRef() {
    return this.inputRefs || this.refs.input;
  }

  focus() {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.inputRef().clear();
  }
}
