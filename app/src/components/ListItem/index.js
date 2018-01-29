import React from "react";
import PropTypes from "prop-types";
import { View, Image, Switch, TextInput } from "react-native";
import { ButtonView, Text } from "../../components";
import { Actions } from "react-native-router-flux";

import styles from "./styles";

export default class ListItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    navigate: PropTypes.string,
    containerStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    descriptionStyle: PropTypes.object,
    leftImage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.oneOf(["none"])
    ]),
    rightImage: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.oneOf(["none"])
    ])
  };

  static defaultProps = {
    title: undefined,
    navigate: undefined,
    description: undefined,
    onPress: undefined,
    leftImage: undefined,
    rightImage: undefined,
    containerStyle: undefined,
    titleStyle: undefined,
    descriptionStyle: undefined
  };

  _onPress = () => {
    const { onPress, navigate } = this.props;
    if (onPress) {
      onPress();
    } else if (navigate) {
      Actions.push(navigate);
    }
  };

  renderLeftImage() {
    const { leftImage } = this.props;
    if (leftImage) {
      return (
        <View style={styles.imageContainer}>
          <Image source={leftImage} style={styles.icon} resizeMode="contain" />
        </View>
      );
    }

    return null;
  }

  renderBody() {
    const {
      title,
      description,
      containerStyle,
      globalTitleStyle,
      globalDescriptionStyle,
      titleStyle,
      descriptionStyle
    } = this.props;
    return (
      <View style={[styles.body, containerStyle]}>
        {title && (
          <Text
            type="bold"
            size="large"
            textAlign="left"
            numberOfLines={1}
            style={globalTitleStyle || titleStyle}
          >
            {title}
          </Text>
        )}
        <View>{this.renderBodyDescription()}</View>
      </View>
    );
  }

  renderBodyDescription() {
    const { descriptionInputText, onPress } = this.props;
    const {
      description,
      globalDescriptionStyle,
      descriptionStyle
    } = this.props;

    if (
      descriptionInputText &&
      (descriptionInputText.showInputText !== undefined ||
        descriptionInputText.showInputText !== null)
    ) {
      return (
        <TextInput
          underlineColorAndroid={"transparent"}
          onChangeText={text => onPress && onPress(text)}
          style={[globalDescriptionStyle, styles.textInputStyle]}
          value={descriptionInputText.showInputText}
        />
      );
    } else if (!descriptionInputText && description) {
      return (
        <Text textAlign="left" numberOfLines={3} style={globalDescriptionStyle}>
          {description}
        </Text>
      );
    }
    return null;
  }

  renderRightComponent() {
    const { rightComponent, onPress } = this.props;
    if (
      rightComponent &&
      (rightComponent.switch !== undefined || rightComponent.switch !== null)
    ) {
      return (
        <View style={styles.rightContainer}>
          <Switch
            onValueChange={value => onPress && onPress(value)}
            value={rightComponent.switch}
          />
        </View>
      );
    }

    return null;
  }
  renderRightImage() {
    const { rightImage } = this.props;
    if (rightImage && rightImage !== "none") {
      return (
        <View style={styles.rightContainer}>
          <Image source={rightImage} resizeMode="contain" />
        </View>
      );
    }

    return null;
  }

  render() {
    const { ...rest } = this.props;
    return (
      <ButtonView
        style={styles.container}
        activeOpacity={1}
        {...rest}
        onPress={this._onPress}
      >
        {this.renderLeftImage()}
        {this.renderBody()}
        {this.renderRightImage()}
        {this.renderRightComponent()}
      </ButtonView>
    );
  }
}
