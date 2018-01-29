// @flow

import React from "react";
import PropTypes from "prop-types";
import Modal from "react-native-modal";
import { View, Picker as PickerRN } from "react-native";

import styles from "./styles";
import { Text, ButtonView } from "../";
import { ApplicationStyles } from "../../theme";

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

  _renderHeader() {
    const { title, onSelectedValue } = this.props;
    return (
      <View style={styles.header}>
        <ButtonView
          style={ApplicationStyles.flex}
          onPress={() => this.showPicker(false)}
        >
          <Text size="small" color="azure" type={"medium"} textAlign="left">
            Cancel
          </Text>
        </ButtonView>
        <Text color="secondary" type={"medium"} style={ApplicationStyles.flex}>
          {title}
        </Text>
        <ButtonView
          style={ApplicationStyles.flex}
          onPress={() => {
            this.showPicker(false);
            onSelectedValue(this.state.itemIndex);
          }}
        >
          <Text size="small" color="azure" type={"medium"} textAlign="right">
            Done
          </Text>
        </ButtonView>
      </View>
    );
  }

  _renderPicker() {
    const { data } = this.props;
    return (
      <PickerRN
        selectedValue={this.state.selectedValue}
        onValueChange={this._onValueChange}
      >
        {data.map(picker => (
          <PickerRN.Item
            key={picker.label}
            label={picker.label}
            value={picker.value}
          />
        ))}
      </PickerRN>
    );
  }

  render() {
    return (
      <Modal
        style={styles.container}
        isVisible={this.state.modalVisible}
        onBackButtonPress={() => this.showPicker(false)}
      >
        <View style={styles.body}>
          {this._renderHeader()}
          {this._renderPicker()}
        </View>
      </Modal>
    );
  }
}
