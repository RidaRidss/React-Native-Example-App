import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Images } from "../../theme";
import { Actions } from "react-native-router-flux";

export default class TabButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesArray: this.props.imagesArray
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.imagesArray.map((item, index) => {
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
