import React, { Component } from "react";
import { Image, View } from "react-native";
import { Images } from "../../theme";
import styles from "./styles";
import PropTypes from "prop-types";
import { ButtonView } from "../";

export default class TabBarIcons extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    goToPage: PropTypes.func,
    changeTitle: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array
  };

  _getImage(index) {
    if (this.props.activeTab === index) {
      return Images.tabActiveIcons[index];
    }
    return Images.tabInactiveIcons[index];
  }

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <ButtonView
              key={i}
              style={styles.tab}
              onPress={() => {
                if (this.props.onPress) {
                  this.props.onPress(i);
                } else {
                  this.props.goToPage(i);
                }
              }}
            >
              <Image
                resizeMode="contain"
                source={this._getImage(i)}
                // ref={icon => {
                //   this.tabIcons[i] = icon;
                // }}
              />
            </ButtonView>
          );
        })}
      </View>
    );
  }
}
