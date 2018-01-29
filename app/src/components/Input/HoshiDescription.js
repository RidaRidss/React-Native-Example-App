import React from "react";
import {
  Text,
  View,
  Animated,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

import BaseInput from "./BaseInput";
import { Colors, Fonts, Metrics } from "../../theme";

const marginLeft = Platform.OS === "ios" ? 5 * Metrics.ratio : 0;

const styles = StyleSheet.create({
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
    color: Colors.text.secondary,
    fontSize: Fonts.size.large,
    fontFamily: Fonts.type.base
  }
});

export default class Hoshi extends BaseInput {
  forceResize = ({ target, nativeEvent }) => {
    if (
      nativeEvent &&
      nativeEvent.contentSize &&
      nativeEvent.contentSize.height !== this.height
    ) {
      if (this.height) {
        this.props.onContentSizeChange(target);
      }
      this.height = nativeEvent.contentSize.height;
      this.inputRefs._handleNativeEvent(nativeEvent);
    }
  };

  render() {
    const { label } = this.props;
    const { width, focusedAnim, value } = this.state;

    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this.focus}>
          <Animated.View
            style={[
              styles.labelContainer,
              {
                top: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, -2]
                })
              }
            ]}
          >
            <Text style={styles.label}>{label}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <AutoGrowingTextInput
          minHeight={30}
          value={value}
          maxHeight={300}
          maxLength={180}
          numberOfLines={4}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onChange={this._onChange}
          autoCapitalize="sentences"
          onContentSizeChange={this.forceResize}
          underlineColorAndroid={"transparent"}
          ref={ref => {
            this.inputRefs = ref;
          }}
          style={[
            styles.textInput,
            {
              width,
              flex: 1,
              top: Platform.select({
                ios: 15 * Metrics.ratio,
                android: 12 * Metrics.ratio
              }),
              left: -4 * Metrics.ratio
            }
          ]}
        />
      </View>
    );
  }
}
