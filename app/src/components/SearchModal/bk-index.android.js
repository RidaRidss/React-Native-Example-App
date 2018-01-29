import React, { PureComponent } from "react";
import { View, Modal, Image, Text } from "react-native";
import Search from "react-native-search-box";
import { Actions } from "react-native-router-flux";
import { Metrics, ApplicationStyles, Colors, Images } from "../../theme";
import styles from "./styles";

class SearchModal extends PureComponent {
  state = {
    modalVisible: true
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
    Actions.pop();
  };

  render() {
    const searchIcon = (
      <Image
        source={Images.searchBlack}
        resizeMode="contain"
        style={{
          width: Metrics.icon.small,
          height: Metrics.icon.small
        }}
      />
    );

    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <Search
          autoFocus
          inputHeight={Metrics.generatedFontSize(39)}
          cancelButtonStyle={{ backgroundColor: Colors.text.primary }}
          placeholder={"Type here ..."}
          dfd
          backgroundColor={Colors.text.primary}
          placeholderTextColor={Colors.text.primary}
          iconSearch={searchIcon}
          searchIconCollapsedMargin={30}
          searchIconExpandedMargin={30}
          placeholderExpandedMargin={45}
          //placeholderExpandedMargin={}
          cancelButtonTextStyle={[
            ApplicationStyles.mediumDescription,
            {
              color: Colors.white,
              fontWeight: "bold"
            }
          ]}
          inputStyle={[
            ApplicationStyles.mediumDescription,
            {
              fontWeight: "bold"
            }
          ]}
          onCancel={() => this.setModalVisible(false)}
        />
        <View style={styles.container2} />
      </Modal>
    );
  }
}

export default SearchModal;
