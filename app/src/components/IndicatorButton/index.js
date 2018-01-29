// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Text, ActivityIndicator } from "react-native";
import ButtonView from "../ButtonView";
import { ApplicationStyles, Metrics } from "../../theme";
import styles from "./styles";

export default class IndicatorButton extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number
    ]),
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    title: PropTypes.string
  };

  static defaultProps = {
    style: styles.button,
    loading: false,
    title: "assign me title"
  };

  _renderActivityIndicator() {
    if (this.props.loading) {
      return (
        <View style={{ position: "absolute", right: Metrics.baseMargin }}>
          <ActivityIndicator animating color="white" size="small" />
        </View>
      );
    }
    return null;
  }

  render() {
    const { style, title } = this.props;
    return (
      <ButtonView style={style} onPress={this.props.onPress}>
        <Text style={ApplicationStyles.avenierBlack20}>{title}</Text>
        {this._renderActivityIndicator()}
      </ButtonView>
    );
  }
}
