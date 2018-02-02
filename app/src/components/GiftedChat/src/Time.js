import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

import moment from "moment/min/moment-with-locales.min";
import {
  isSameUser,
  isSameDay,
  isMessageInInterval,
  capitalizeFirstLetter
} from "./utils";
import { Colors, Fonts } from "../../../theme";

export default class Time extends React.Component {
  render() {
    const renderAvatarOnTop = this.props.renderAvatarOnTop;
    const messageToCompare = renderAvatarOnTop
      ? this.props.previousMessage
      : this.props.nextMessage;

    if (
      isSameUser(this.props.currentMessage, messageToCompare) &&
      isSameDay(this.props.currentMessage, messageToCompare) &&
      isMessageInInterval(this.props.currentMessage, messageToCompare)
    ) {
      return null;
    }
    return (
      <View
        style={[
          styles[this.props.position].container,
          this.props.containerStyle[this.props.position]
        ]}
      >
        <Text
          style={[
            styles[this.props.position].text,
            this.props.textStyle[this.props.position]
          ]}
        >
          {this.props.position === "left" &&
            `${capitalizeFirstLetter(this.props.currentMessage.user.name)}, `}
          {moment(this.props.currentMessage.createdAt)
            .locale(this.context.getLocale())
            .format(this.props.timeFormat)}
        </Text>
      </View>
    );
  }
}

const containerStyle = {
  marginLeft: 4,
  marginRight: 4,
  marginBottom: 2,
  marginTop: 12
};

const textStyle = {
  fontSize: 10,
  backgroundColor: "transparent",
  textAlign: "right"
};

const styles = {
  left: StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: Colors.text.darkGray,
      fontSize: Fonts.size.xxSmall,
      fontFamily: Fonts.type.book
    }
  }),
  right: StyleSheet.create({
    container: {
      ...containerStyle
    },
    text: {
      color: Colors.text.darkGray,
      fontSize: Fonts.size.xxSmall,
      fontFamily: Fonts.type.book
    }
  })
};

Time.contextTypes = {
  getLocale: PropTypes.func
};

Time.defaultProps = {
  position: "left",
  currentMessage: {
    createdAt: null
  },
  containerStyle: {},
  textStyle: {}
};

Time.propTypes = {
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
  timeFormat: PropTypes.string
};
