// @flow
import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { Colors } from "../../theme";

const Loader = ({ visible }) => {
  if (visible) {
    return (
      <Modal transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            opacity: 0.5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color={Colors.background.secondary} />
        </View>
      </Modal>
    );
  } else return null;
};

export default Loader;
