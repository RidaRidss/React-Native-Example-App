
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";

const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41
});
const MAX_COMPOSER_HEIGHT = 100;

const styles = StyleSheet.create({
  labelContainer: {
    position: "absolute"
  },
  textInput: {
    flex: 1,
    fontSize: 16
    // marginTop: Platform.select({
    //   ios: 6,
    //   android: 0
    // }),
    // marginBottom: Platform.select({
    //   ios: 5,
    //   android: 3
    // })
  }
});

export default class AutoGrowInput extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    placeholderStyle: PropTypes.object,
    composerHeight: PropTypes.number,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    onTextChanged: PropTypes.func,
    onInputSizeChanged: PropTypes.func,
    multiline: PropTypes.bool,
    textInputStyle: TextInput.propTypes.style,
    onMeasure: PropTypes.func
  };

  static defaultProps = {
    style: {},
    placeholderStyle: {},
    composerHeight: Platform.select({
      ios: 33,
      android: 41
    }),
    text: "",
    placeholder: "",
    multiline: true,
    textInputStyle: {},
    onTextChanged: () => {},
    onInputSizeChanged: () => {},
    onMeasure: () => {}
  };

  state = {
    focusedAnim: new Animated.Value(this.props.text ? 1 : 0),
    composerHeight: MIN_COMPOSER_HEIGHT
  };

  // componentWillReceiveProps(newProps: Object) {
  //   // const newText = newProps.text;
  //   // if (newProps.hasOwnProperty("text") && newText !== this.state.text) {
  //   //   this.setState({
  //   //     text: newText
  //   //   });

  //   //   // animate input if it's active state has changed with the new value
  //   //   // and input is not focused currently.
  //     const isFocused = this.inputRef.isFocused();
  //     if (!isFocused) {
  //       const isActive = Boolean(newText);
  //       if (isActive !== this.isActive) {
  //         this._toggle(isActive);
  //       }
  //     }
  //   }
  // }

  onContentSizeChange = (e: Object) => {
    this.onInputSizeChanged(e);
  };

  onInputSizeChanged(e: Object) {
    const contentSize = e.nativeEvent.contentSize;

    if (!contentSize) return;

    if (
      !this.contentSize ||
      this.contentSize.width !== contentSize.width ||
      this.contentSize.height !== contentSize.height
    ) {
      const inputHasGrow = this.contentSize < contentSize;
      this.contentSize = contentSize;
      const newComposerHeight = Math.max(
        MIN_COMPOSER_HEIGHT,
        Platform.select({
          ios: Math.min(MAX_COMPOSER_HEIGHT, contentSize.height),
          android: contentSize.height
        })
      );
      this.setState({
        composerHeight: newComposerHeight
      });
      this.props.onContentSizeChange &&
        this.props.onContentSizeChange(newComposerHeight, inputHasGrow);
    }
  }

  _toggle(isActive) {
    this.isActive = isActive;
    Animated.timing(this.state.focusedAnim, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      easing: Easing.bezier(0.2, 1, 0.3, 1)
    }).start();
  }

  _onFocus = () => {
    this._toggle(true);
  };

  _onBlur = () => {
    if (!this.props.text) {
      this._toggle(false);
    }
  };

  inputRef: any;
  contentSize: any;
  isActive = false;

  _onMeasure = () => {
    this.inputRef.measure((fx, fy, width, height, px, py) => {
      this.props.onMeasure(fx, fy, width, height, px, py);
    });
  };

  render() {
    const {
      text,
      style,
      multiline,
      placeholder,
      onTextChanged,
      placeholderStyle,
      textInputStyle,
      ...rest
    } = this.props;
    const { focusedAnim } = this.state;
    return (
      <View style={style}>
        <TouchableWithoutFeedback onPress={() => this.inputRef.focus()}>
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
            <Text style={placeholderStyle}>{placeholder}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>

        <TextInput
          value={text}
          ref={ref => {
            this.inputRef = ref;
          }}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          enablesReturnKeyAutomatically
          multiline={multiline}
          onContentSizeChange={this.onContentSizeChange}
          onChangeText={onTextChanged}
          style={[
            styles.textInput,
            textInputStyle,
            { height: this.state.composerHeight }
          ]}
          accessibilityLabel={text || placeholder}
          underlineColorAndroid="transparent"
          {...rest}
        />
      </View>
    );
  }
}
