import Modal from "react-native-modal";
import { View, Image, StatusBar } from "react-native";
import React, { PureComponent } from "react";
import Search from "react-native-search-box";

import { Metrics, Colors, Images } from "../../theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { Actions } from "react-native-router-flux";
import { Text, ButtonView } from "../../components";
import styles from "./styles";

// import mapstyles from "./mapstyles";

let address = undefined;

class SearchModal extends PureComponent {
  state = {
    isVisible: true
  };
  componentDidMount() {
    StatusBar.setBarStyle("dark-content");
  }
  _hideModal = () => this.setState({ isModalVisible: false });
  _handleClose = () => {
    this._hideModal();
  };
  GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        bounces={false}
        placeholder="Search Location"
        minLength={2} // minimum length of text to search
        autoFocus
        // ListFooterComponent={this._renderFooter()}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails
        ref={ref => {
          this.googlePlacesInput = ref;
        }}
        styles={{
          textInputContainer: {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: Metrics.ratio(50),
            backgroundColor: "#fff"
          },
          textInput: {
            marginLeft: Metrics.ratio(5),
            marginRight: 0,
            height: 38,
            color: "#000",

            fontSize: 16,
            backgroundColor: "rgba(241, 241, 242, 1)",
            borderWidth: 1
          },
          predefinedPlacesDescription: {
            backgroundColor: "#fff"
          }
        }}
        renderDescription={row => row.description}
        onPress={(data, details) => {
          // 'details' is provided when fetchDetails = true
          const { lat: latitude, lng: longitude } = details.geometry.location;
          this.animateMap(latitude, longitude);

          this.address = {
            location: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
          };
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyCCzCicPKAjGdmjHa14pB4Irg5AtWRo9fU",
          language: "en", // language of the results
          default: "geocode" // types: "(cities)"
        }}
        // styles={mapstyles}
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          types: "food"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderLeftButton={() => <Back />}
        textInputProps={{
          clearButtonMode: "never",
          autoCapitalize: "none",
          autoCorrect: false,
          selectionColor: Colors.text.accent
        }}
        renderRightButton={() => (
          <ButtonView style={styles.done} onPress={this._handleClose}>
            <Text color="darkestGrey" size="small">
              Cancel
            </Text>
          </ButtonView>
        )}
      />
    );
  };

  render() {
    const searchIcon = (
      <Image
        source={Images.back}
        resizeMode="contain"
        style={{
          width: Metrics.icon.small,
          height: Metrics.icon.small
        }}
      />
    );

    return (
      <Modal
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={styles.container}
        // isVisible={this.state.isVisible}
        // // onRequestClose={() => {
        // //   this.setModalVisible(false);
        // // }}
        isVisible={this.state.isModalVisible}
        // onModalHide={this._handleModalClosePostAnimation}
      >
        {this.GooglePlacesInput()}
      </Modal>
      // <Search
      //   autoFocus
      //   iconSearch={searchIcon}
      //   // placeholder="Type here ..."
      //   inputHeight={Metrics.ratio(36)}
      //   backgroundColor={Colors.text.primary}
      //   // placeholderTextColor={Colors.text.primary}
      //   placeholderExpandedMargin={Metrics.ratio(24)}
      //   onCancel={() => this.setModalVisible(false)}
      // />
    );
  }
}

export default SearchModal;
