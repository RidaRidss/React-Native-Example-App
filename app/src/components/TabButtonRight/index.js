import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Images } from "../../theme";

export default class TabButtonRight extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.imagesArray.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.iconContainer}
              onPress={() =>
                this.props.actions[index] && this.props.actions[index]()}
            >
              <Image
                source={Images[item]}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
