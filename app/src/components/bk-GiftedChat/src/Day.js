import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

import moment from "moment/min/moment-with-locales.min";

import { isSameDay, isSameUser, warnDeprecated } from "./utils";
import { Colors, Fonts } from "../../../theme";

export default class Day extends React.Component {
  render() {
    const { dateFormat } = this.props;

    //console.log(moment(this.props.currentMessage.createdAt).fromNow());
    const localDate = moment(
      moment(this.props.currentMessage.createdAt).locale(
        this.context.getLocale()
      )
    );
    const dateString =
      moment().diff(localDate, "days") >= 1
        ? localDate.format(dateFormat).toUpperCase()
        : localDate.calendar().split(" ")[0];

    if (!isSameDay(this.props.currentMessage, this.props.previousMessage)) {
      return (
        <View style={[styles.container, this.props.containerStyle]}>
          <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.text, this.props.textStyle]}>
              {dateString}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 10
  },
  wrapper: {
    backgroundColor: Colors.background.whiteSmoke,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  text: {
    color: Colors.text.darkGray,
    fontSize: Fonts.size.xxSmall,
    fontFamily: Fonts.type.book
  }
});

Day.contextTypes = {
  getLocale: PropTypes.func
};

Day.defaultProps = {
  currentMessage: {
    // TODO test if crash when createdAt === null
    createdAt: null
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  //TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser)
};

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  //TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func,
  dateFormat: PropTypes.string
};
