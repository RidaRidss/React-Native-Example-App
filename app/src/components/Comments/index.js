// @flow
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Platform, FlatList, Keyboard, Animated } from "react-native";

import styles from "./styles";
import Comment from "./Comment";
import InputToolbar from "./InputToolbar";

export default class Comments extends Component {
  static propTypes = {
    renderItem: PropTypes.func,
    data: PropTypes.array.isRequired,
    textInputProps: PropTypes.object,
    onComment: PropTypes.func,
    onAttach: PropTypes.func
  };

  static defaultProps = {
    textInputProps: {},
    onComment: () => {},
    onAttach: () => {},
    renderItem: data => <Comment {...data} />
  };

  static Comment = Comment;

  componentWillMount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShowListener = Keyboard.addListener(
        "keyboardWillShow",
        this.keyboardWillShow
      );
      this.keyboardWillHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this.keyboardWillHide
      );
    }
  }

  shouldComponentUpdate(nextProps: Object) {
    return !_.isEqual(nextProps, this.props);
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      this.keyboardWillShowListener.remove();
      this.keyboardWillHideListener.remove();
    }
  }

  list: any;
  keyboardWillShowListener: any;
  keyboardWillHideListener: any;
  keyboardHeight = new Animated.Value(0);

  keyboardWillShow = (event: Object) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: event.endCoordinates.height
    }).start();
  };

  keyboardWillHide = (event: Object) => {
    Animated.timing(this.keyboardHeight, {
      duration: event.duration,
      toValue: 0
    }).start();
  };

  scrollToOffset = (offset: Object = { y: 0, animated: true }) => {
    this.list.scrollToOffset(offset);
  };

  render() {
    const { data, textInputProps, onComment, onAttach, ...rest } = this.props;
    return (
      <Animated.View
        style={[styles.container, { paddingBottom: this.keyboardHeight }]}
      >
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={styles.container}
          keyExtractor={(_, index) => index}
          data={data}
          {...rest}
        />
        <InputToolbar
          onComment={onComment}
          onAttach={onAttach}
          textInputProps={textInputProps}
        />
      </Animated.View>
    );
  }
}
