import PropTypes from "prop-types";
import React from "react";
import { Linking, StyleSheet, Text, View, ViewPropTypes } from "react-native";

import ParsedText from "react-native-parsed-text";
import Communications from "react-native-communications";

import { Colors, Fonts } from "../../../theme";

const WWW_URL_PATTERN = /^www\./i;

export default class MessageText extends React.Component {
  constructor(props) {
    super(props);
    this.onUrlPress = this.onUrlPress.bind(this);
    this.onPhonePress = this.onPhonePress.bind(this);
    this.onEmailPress = this.onEmailPress.bind(this);
  }

  onUrlPress(url) {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      this.onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.error("No handler for URL:", url);
        } else {
          Linking.openURL(url);
        }
      });
    }
  }

  onPhonePress(phone) {
    const options = ["Call", "Text", "Cancel"];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            Communications.phonecall(phone, true);
            break;
          case 1:
            Communications.text(phone);
            break;
        }
      }
    );
  }

  onEmailPress(email) {
    Communications.email([email], null, null, null, null);
  }

  render() {
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position]
        ]}
      >
        <ParsedText
          style={[
            styles[this.props.position].text,
            this.props.textStyle[this.props.position]
          ]}
          parse={[
            {
              type: "url",
              style: StyleSheet.flatten([
                styles[this.props.position].link,
                this.props.linkStyle[this.props.position]
              ]),
              onPress: this.onUrlPress
            },
            {
              type: "phone",
              style: StyleSheet.flatten([
                styles[this.props.position].link,
                this.props.linkStyle[this.props.position]
              ]),
              onPress: this.onPhonePress
            },
            {
              type: "email",
              style: StyleSheet.flatten([
                styles[this.props.position].link,
                this.props.linkStyle[this.props.position]
              ]),
              onPress: this.onEmailPress
            }
          ]}
        >
          {this.props.currentMessage.text}
        </ParsedText>
      </View>
    );
  }
}

const textStyle = {
  lineHeight: 20,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 16,
  marginRight: 16,
  fontSize: Fonts.size.xSmall,
  fontFamily: Fonts.type.book
};

const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: Colors.text.secondary,
      ...textStyle
    },
    link: {
      color: Colors.text.secondary,
      textDecorationLine: "underline",
      ...textStyle
    }
  }),
  right: StyleSheet.create({
    container: {},
    text: {
      color: Colors.text.primary,
      ...textStyle
    },
    link: {
      color: Colors.text.primary,
      textDecorationLine: "underline",
      ...textStyle
    }
  })
};

MessageText.contextTypes = {
  actionSheet: PropTypes.func
};

MessageText.defaultProps = {
  position: "left",
  currentMessage: {
    text: ""
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {}
};

MessageText.propTypes = {
  position: PropTypes.oneOf(["left", "right"]),
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style
  }),
  textStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style
  }),
  linkStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style
  })
};