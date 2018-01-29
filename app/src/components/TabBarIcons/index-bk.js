// react
import React, { Component } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

// styles
import { Images, Colors } from "../../theme";

export default React.createClass({
  tabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
    // TODO: style is coming so add in propTypes
    // TODO: scrollValue is coming so add in propTypes
  },

  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => this.props.goToPage(i)}
            >
              <Image
                source={this._getImage(i)}
                ref={icon => {
                  this.tabIcons[i] = icon;
                }}
              />
              {i == 3 &&
              this.props.count !== 0 && (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: "flex-end",
                    top: 5,
                    position: "absolute"
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: "black"
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 13 }}>
                      {this.props.count}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },

  _getImage(index) {
    if (this.props.activeTab === index) {
      return Images.tabIcons[index];
    }

    return Images.tabDisabledIcons[index];
  }
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabs: {
    height: 50,
    flexDirection: "row",
    borderWidth: 0,
    borderColor: Colors.border
  }
});
