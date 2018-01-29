import React, { Component } from "react";
import { Image, ActivityIndicator } from "react-native";
import { ButtonView, Text } from "../index";
import { connect } from "react-redux";
import { Metrics, Images, Colors } from "../../theme";
import styles from "./styles";

class LocationButton extends Component {
  render() {
    return (
      <ButtonView
        style={styles.container}
        onPress={() => (!this.props.showLoader ? this.props.onPress() : {})}
      >
        {this.props.showLoader ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Image
            source={Images.facebook}
            style={{ marginLeft: Metrics.smallMargin }}
          />
        )}
        <Text color="tertiary" type="medium" style={{ flex: 1 }}>
          Allow Location Access
        </Text>
      </ButtonView>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(LocationButton);
