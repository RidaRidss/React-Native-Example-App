import React, { Component } from "react";
import { TouchableOpacity, Modal } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../";
import styles from "./styles";

export default class LocationModal extends Component {
  render() {
    return (
      <Modal animationType="fade" transparent visible onRequestClose={() => {}}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => Actions.pop()}
        >
          <Text style={styles.title}>Current Location</Text>
          <Text style={styles.description}>
            Groov needs access to your location. Please turn on Location
            services in your device Settings.
          </Text>
          <ButtonView style={styles.button} onPress={() => null}>
            <Text style={styles.buttonText}>Go to settings</Text>
          </ButtonView>
        </TouchableOpacity>
      </Modal>
    );
  }
}
