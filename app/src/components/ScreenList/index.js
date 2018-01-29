// @flow
import PropTypes from "prop-types";
import { FlatList, ListItem } from "../../components";
import React, { Component } from "react";

export default class ScreenList extends Component {
  static propTypes = {
    data: PropTypes.array
    // titleStyle: PropTypes.object,
    // descriptionStyle: PropTypes.object
  };
  static defaultProps = {
    titleStyle: undefined,
    descriptionStyle: undefined,
    data: [
      {
        title: "About App",
        navigate: "AboutAppScreen"
      },
      {
        title: "Privacy Policy",
        navigate: "PrivacyPolicyScreen"
      },
      {
        title: "Terms & Conditions",
        navigate: "TermsConditionsScreen"
      }
    ]
  };
  _renderItem = info =>
    <ListItem
      {...info.item}
      globalTitleStyle={this.props.titleStyle}
      globalDescriptionStyle={this.props.descriptionStyle}
    />;
  render() {
    return <FlatList data={this.props.data} renderItem={this._renderItem} />;
  }
}
