// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import styles from "./styles";
import { Text, ButtonView, GifAnimation } from "../../../components";
import { Images, ApplicationStyles } from "../../../theme";

export default class NoInternetView extends Component {
  static propTypes = {
    onRetryPress: PropTypes.func,
    message: PropTypes.string
  };

  static defaultProps = {
    onRetryPress: () => {},
    message: "No internet connection found check your connection"
  };
  render() {
    const { onRetryPress, message } = this.props;
    return (
      <View style={styles.container}>
        <GifAnimation
          source={Images.noInternet}
          containerStyle={ApplicationStyles.emptyDataGif}
        />
        <Text size="eighteen" color="#3e3e3e" style={styles.text} type="black">
          Ooops!
        </Text>
        <View style={styles.noConnection}>
          <Text size="normal" color="primary" style={styles.text} type="base">
            {message}
          </Text>
        </View>
        <ButtonView style={styles.leftButtonView} onPress={onRetryPress}>
          <Text
            size="eighteen"
            color="#3e3e3e"
            style={styles.text}
            type="black"
          >
            Try Again
          </Text>
        </ButtonView>
      </View>
    );
  }
}

// render() {
//   <View style={styles.container}>
//   <View style={{ flex: 1, backgroundColor: "blue" }}>
//     <GifAnimation
//       source={Images.mySpotEntrance}
//       //containerStyle={ApplicationStyles.emptyDataGif}
//       containerStyle={{ width: 100, height: 100 }}
//     />
//   </View>
//   <View style={{ flex: 2, backgroundColor: "red" }}>
//     <Text
//       size="eighteen"
//       color="#3e3e3e"
//       style={styles.text}
//       type="black"
//     >
//       Ooops!
//     </Text>
//     <Text size="normal" color="##8d8d8d" style={styles.text} type="base">
//       No internet connection found check your connection
//     </Text>
//     <ButtonView style={styles.leftButtonView} onPress={onRetryPress}>
//       <Text
//         size="eighteen"
//         color="#3e3e3e"
//         style={styles.text}
//         type="black"
//       >
//         Try Again
//       </Text>
//     </ButtonView>
//   </View>
// </View>
// }
