import React from "react";
import { View, TextInput, Image } from "react-native";

import { Images } from "../../theme";
import styles from "./styles";

export default class SearchBar extends React.PureComponent {
  render() {
    const { ...reset } = this.props;
    return (
      <View style={styles.horizontalContainer}>
        <Image source={Images.search_grey} style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Search By Event Name"
          underlineColorAndroid="transparent"
          {...reset}
        />
      </View>
    );
  }
}
