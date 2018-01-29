// @flow

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, StatusBar, ActivityIndicator } from "react-native";
import styles from "./styles";

export default class Empty extends React.Component {
  static propTypes = {
    loading: PropTypes.bool
  };

  static defaultProps = {
    loading: false
  };

  render() {
    const { loading } = this.props;
    return (
      <View>
        <StatusBar networkActivityIndicatorVisible={loading} />
        <Modal
          style={{ margin: 0 }}
          backdropOpacity={0.1}
          animationIn="fadeIn"
          isVisible={loading}
        >
          <View style={styles.container}>
            <ActivityIndicator animating size="large" />
          </View>
        </Modal>
      </View>
    );
  }
}
