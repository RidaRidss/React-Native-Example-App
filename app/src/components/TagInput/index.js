import _ from "lodash";
import React, { Component } from "react";
import KeyEvent from "react-native-keyevent";
import { TextInput, ScrollView, Platform } from "react-native";
import styles from "./styles";
import Text from "../Text";
import ButtonView from "../ButtonView";
import { Colors } from "../../theme";

export default class TagInput extends Component {
  state = {
    tags: !_.isEmpty(this.props.tags)
      ? this.props.tags.replace(/^\s+|\s+$/gm, "").split(",")
      : [],
    userInput: ""
  };

  componentDidMount() {
    if (Platform.OS === "android") {
      KeyEvent.onKeyDownListener(() => {
        if (this.focused) {
          this.removeTag();
        }
      });
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      KeyEvent.removeKeyDownListener();
    }
  }

  focused = false;

  getTags = () => this.state.tags;

  _addTagToStateArray = () => {
    if (this.state.userInput.length > 0) {
      const tempArray = this.state.tags;
      tempArray.push(this.state.userInput.replace(/\s/g, ""));
      this.inputText.clear();
      this.setState({
        tags: tempArray,
        userInput: ""
      });
      this.scrollView.scrollToEnd({ animated: true });
    }
  };

  _handleUserValues = value => {
    if (_.isEmpty(value.replace(/\s/g, ""))) {
      return;
    }
    this.setState({
      userInput: value
    });

    if (
      value.charAt(value.length - 1) === " " &&
      this.state.userInput.length > 0
    ) {
      const tempArray = this.state.tags;
      const hash = value[0] === "#" ? "" : "#";

      tempArray.push(hash + value.trim().split(" "));
      this.setState(
        {
          tags: tempArray,
          userInput: ""
        },
        () => {
          this.inputText.clear();
          this.scrollView.scrollToEnd({ animated: true });
        }
      );
    }
  };

  removeTag = () => {
    const tagToRemove = this.state.tags[this.state.tags.length - 1];
    this.inputText.clear();
    const filteredArray = this.state.tags.filter(item => item !== tagToRemove);
    this.setState({ tags: filteredArray });
  };

  _removeTag(selectedTag) {
    this.inputText.clear();
    const filteredArray = this.state.tags.filter(item => item !== selectedTag);
    this.setState({ tags: filteredArray });
  }

  _renderTags(item, index) {
    if (item.length > 0) {
      return (
        <ButtonView
          key={index}
          style={styles.tagsContainer}
          // pass item that you want to remove to _removeTag function
          onPress={() => {
            this._removeTag(item);
          }}
        >
          <Text style={styles.tagText}>
            {item}
            {this.state.tags.length - 1 === index ? " " : ", "}
          </Text>
        </ButtonView>
      );
    }
    return null;
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
        horizontal
        style={styles.horizontalContainer}
        ref={ref => (this.scrollView = ref)}
      >
        {this.state.tags.map((item, index) => {
          return this._renderTags(item, index);
        })}
        <TextInput
          placeholderTextColor={this.props.placeholderColor || Colors.secondary}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          ref={ref => (this.inputText = ref)}
          style={styles.inputText}
          onChangeText={this._handleUserValues}
          onSubmitEditing={this._addTagToStateArray}
          placeholder={this.state.tags.length > 0 ? "" : "Enter tags"}
          onBlur={this._onBlur}
          onFocus={this._onFocus}
          onKeyPress={({ nativeEvent }) => {
            if (
              this.state.userInput.length === 0 &&
              nativeEvent.key === "Backspace"
            ) {
              this.removeTag();
            }
          }}
        />
      </ScrollView>
    );
  }

  _onFocus = () => {
    this.focused = true;
  };

  _onBlur = () => {
    this.focused = false;
  };
}
