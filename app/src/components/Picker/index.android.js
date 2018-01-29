// @flow

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View } from "react-native";

import styles from "./styles";
import { Text, ButtonView } from "../";
import { Metrics } from "../../theme";

export default class Picker extends React.Component {
  static propTypes = {
    onSelectedValue: PropTypes.func,
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.array.isRequired
  };

  static defaultProps = {
    onSelectedValue: () => {},
    onValueChange: () => {},
    selectedValue: "events",
    title: "Title"
  };

  state = {
    modalVisible: false,
    itemIndex: 3,
    selectedValue: this.props.selectedValue
  };

  onSelectedValue = () => this.state.selectedValue;

  showPicker = (modalVisible: boolean = true) => {
    this.setState({ modalVisible });
  };

  _onValueChange = (selectedValue, itemIndex) => {
    this.setState({ selectedValue, itemIndex });
    this.props.onValueChange(selectedValue, itemIndex);
  };

  render() {
    const { data, onSelectedValue } = this.props;
    return (
      <Modal
        style={styles.container}
        isVisible={this.state.modalVisible}
        onBackdropPress={() => this.showPicker(false)}
        onBackButtonPress={() => this.showPicker(false)}
      >
        <View style={styles.body}>
          {data.map((picker, index) => (
            <ButtonView
              onPress={() => {
                this.setState({
                  selectedValue: picker.value,
                  itemIndex: index
                });
                this.showPicker(false);
                onSelectedValue(index);
              }}
              key={picker.label}
              style={{
                padding: Metrics.baseMargin
              }}
            >
              <Text
                textAlign="left"
                color={index === this.state.itemIndex ? "secondary" : "primary"}
              >
                {picker.label}
              </Text>
            </ButtonView>
          ))}
        </View>
      </Modal>
    );
  }
}
