import { Platform } from "react-native";
import RNOpenSettings from "react-native-open-setting";
import { Alert } from "react-native";

import Util from "./index";

let location = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121
};

class LocationUtils {
  getLocation() {
    return location;
  }

  getLocationAndDelta() {
    return {
      ...location,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
  }

  setLocation(locationCoords) {
    location = {
      ...locationCoords
    };
  }

  updateLocation(callback, errorCallBack) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.setLocation(location);

        if (callback) {
          callback(location);
        }

        navigator.geolocation.stopObserving();
      },
      error => {
        if (errorCallBack) {
          errorCallBack();
        } else {
          this.onLocationFailure();
        }
      },
      {
        enableHighAccuracy: Platform.OS != "android",
        timeout: 2000,
        maximumAge: 2000
      }
    );
  }

  onLocationFailure = () => {
    if (!Util.isPlatformAndroid()) {
      Alert.alert(
        "Alert",
        "App requires current location, please enable location to continue",
        [
          { text: "OK" },
          {
            text: "Open Settings",
            onPress: () => {
              if (RNOpenSettings) RNOpenSettings.openSettings();
            }
          }
        ],
        { cancelable: false }
      );
    }
  };

  calculateDistance(lat2, lon2) {
    const { latitude: lat1, longitude: lon1 } = location;

    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return "-";
    }

    const R = 6371;

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = Math.round(R * c);

    return `${d} km`;
  }
}

export default new LocationUtils();
