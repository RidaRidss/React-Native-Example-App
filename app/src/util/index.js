// @flow
import _ from "lodash";
import { Platform, Share, Linking, Alert } from "react-native";
import moment from "moment";
import { MessageBarManager } from "react-native-message-bar";
import { ApplicationStyles } from "../theme";
import ApiSauce from "../services/ApiSauce";

import {
  DATE_FORMAT,
  TIME_ZONE,
  DATE_FORMAT_DAY,
  TIME_ONLY_FORMAT,
  TIME_FORMAT_12_HOUR,
  TIME_FORMAT_24_HOUR,
  SERVER_DATE_FORMAT
} from "../constants";

let location = {
  latitude: 24.8690857,
  longitude: 67.0856047,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121
};
let deviceToken;
let deviceUserId;

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
class Util {

  isEmpty = value => _.isEmpty(value);

  keyExtractor = (item: Object, index: number) => index;

  isPlatformAndroid() {
    return Platform.OS === "android";
  }

  getPlatform = () => Platform.OS;

  isPlatformAndroid = () => Platform.OS === "android";

  isPlatformIOS = () => Platform.OS === "ios";

  isValidURL(url: "string") {
    const re = /^(http|https|fttp):\/\/|[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(url);
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
 
  isPasswordValid(password: string) {
    return password.length > 5;
  }

  getLocation() {
    return location;
  }
  setLocation(region) {
    location = region;
  }

  setDeviceToken(token: String) {
    deviceToken = token;
  }
  getDeviceToken() {
    return deviceToken;
  }

  setUserId(userId: String) {
    deviceUserId = userId;
  }
  getUserId() {
    return deviceUserId;
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  calculateDistance(lat2, lon2, lat1, lon1) {
    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return NaN;
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
    
    return d;
  }


  convertKm2Miles(km: number) {
    return _.isNumber(km) ? km * 0.621371 : NaN;
  }
  distanceUnit(distance: number) {
    return `${distance} KM`;
  }
  
  // function to show message bar.
  showAlert = (title, message) => {
    MessageBarManager.showAlert({
      // titleStyle: { ...ApplicationStyles.book18 },
      // messageStyle: { ...ApplicationStyles.light16 },
      titleNumberOfLines: 1,
      messageNumberOfLines: 2,
      title,
      message,
      alertType: "error"
      // stylesheetExtra: {
      //   backgroundColor: Colors.background.tertiary,
      //   strokeColor: Colors.border
      // }
    });
  };

  onShare = (title, message) => {
    Share.share({
      title,
      message
    });
  };

  noInternetMessage = () => {
    MessageBarManager.showAlert({
      title: "No Internet Connection Found",
      message: "Make sure wi-fi or celluar data is turned on",
      alertType: "error"
    });
  };

  removeWhiteSpaces(value) {
    return value.replace(/^\s+|\s+$/gm, "");
  }
  lineCounter(value = "") {
    return value.split(/\r\n|\r|\n/).length;
  }

  getGoogleAddress(latitude, longitude) {
    return `${GOOGLE_ADDRESS_URL},${latitude},${longitude},${GOOGLE_ADDRESS_URl_END}`;
  }


  getAddress() {
    // const url = ${GOOGLE_ADDRESS_URL},${latitude},${longitude},${GOOGLE_ADDRESS_URl_END}`
    // fetch(myRequest)
    //   .then(response => {
    //     if (response.status === 200) {
    //       return response.json();
    //     } else {
    //       throw new Error("Something went wrong on api server!");
    //     }
    //   })
    //   .then(response => {
    //     console.debug(response);
    //     // ...
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    // export const GOOGLE_ADDRESS_URL =
    // "http://maps.googleapis.com/maps/api/geocode/json?latlng=";
    // export const GOOGLE_API_KEY = "AIzaSyBY42wGL_XfHp-TmxJdK45z9qVrfilns68";
    // export const GOOGLE_ADDRESS_URl_END = `&sensor=false&key=${GOOGLE_API_KEY}`;
  }

  getValidImage(image: any) {
    if (typeof image === "string" && this.isValidURL(image)) {
      return { uri: image };
    }
    // if (typeof image === "string" && !this.isValidURL(image)) {
    //   return require(image);
    // }
    return image;
  }

  getCurrentTimeInServerFormat() {
    return moment(Date.now()).format(SERVER_DATE_FORMAT);
  }

  formValidation = (title, message) => {
    MessageBarManager.showAlert({
      // titleStyle: { ...ApplicationStyles.mediumTitle },
      // messageStyle: { ...ApplicationStyles.book18 },
      // titleNumberOfLines: 1,
      // messageNumberOfLines: 2,
      title,
      message,
      alertType: "error"
      // stylesheetExtra: {
      //   backgroundColor: Colors.background.tertiary,
      //   strokeColor: Colors.border
      // }
    });
  };

  alertText = (title, message) => {
    MessageBarManager.showAlert({
      title,
      message,
      alertType: "error"
    });
  };

  getAdd30Minutes(timeStart) {
    return moment(timeStart).add(30, "m");
  }
  getDatabaseDate(givenDate) {
    return moment(givenDate).format("YYYY-MM-DD");
  }

  getMonth(givenDate: String) {
    return moment(givenDate).format("MMM");
  }
  getMonthDate(givenDate: String) {
    return moment(givenDate).format("DD");
  }
  get12Hours(givenTime) {
    return moment(givenTime, ["HH"]).format("LT");
  }
  get24HoursTime(givenTime) {
    return moment(givenTime, ["LT"]).format("HH:mm");
  }
  getDateTime() {
    return moment(Date.now()).format("YYYY-MM-DD HH:mm");
  }

  get24Hours(givenTime) {
    return moment(givenTime).format(TIME_FORMAT_24_HOUR);
  }

  getCurrentTime() {
    return moment(Date.now()).format(TIME_ONLY_FORMAT);
  }

  getCurrentGivenTime(givenTime) {
    return moment(givenTime).format(TIME_ONLY_FORMAT);
  }

  getDate(givenDate) {
    return moment(givenDate)
      .add(TIME_ZONE, "hours")
      .format(DAY_DATE_FORMAT);
  }

  getCurrentDate() {
    return moment(Date.now()).format(DAY_DATE_FORMAT);
  }

  
  
  getUserProfile(fbId) {
    return `http://graph.facebook.com/${fbId}/picture?type=large`;
  }
  
  getDateOfBirthFromNow() {
    return moment(Date.now()).add(-15, "years");
  }
  
  // getDateFrom(givenDate) {
  //   return moment(givenDate)
  //     .add(TIME_ZONE, "hours")
  //     .fromNow();
  // }


  getDateFrom(givenDate) {
    // moment.locale("en", {
    //   relativeTime: {
    //     future: "in %s",
    //     past: "%s ",
    //     s: "s",
    //     m: "m",
    //     mm: "%d m",
    //     h: "h",
    //     hh: "%d h",
    //     d: "d",
    //     dd: "%d d",
    //     M: "a mth",
    //     MM: "%d mths",
    //     y: "y",
    //     yy: "%d y"
    //   }
    // });
    return moment(givenDate)
      .add(TIME_ZONE, "h")
      .fromNow();
  }

  getCurrentDayDate() {
    return moment(Date.now()).format(DATE_FORMAT);
  }

  getCurrentDayDateWithMilliseconds() {
    return moment(Date.now()).format(DATE_FORMAT_DAY);
  }

  isDatePast(date) {
    return moment(date).format(DAY_DATE_FORMAT) < this.getCurrentDate();
  }
  

  getDate(givenDate) {
    return moment(givenDate).format(DATE_FORMAT_DAY);
  }

  dateValidation(date: String) {
    if (date >= this.getCurrentDayDate()) {
      this.showAlert("Error", "Check Date");
      setTimeout(() => {
        // this.birthDate.focus();
      }, 500);
    }
  } 
  getGoogleUrl(latitude, longitude) {
    return `${GOOGLE_URL},
    /?daddr=${latitude},${longitude}`;
  }
  getLinking(googleUrl) {
    return Linking.canOpenURL(googleUrl).then(supported => {
      if (supported) {
        Linking.openURL(googleUrl);
      }
    });
  }
  _getUserLocation(userlat, userlng) {
    try {
      return { userlat, userlng };
    } catch (e) {
      return "--";
    }
  }

  // async getMoviesFromApi(latitude, longitude) {
  //   try {
  //     // let response = await fetch(
  //     //   `${GOOGLE_ADDRESS_URL},${latitude},${longitude},${GOOGLE_ADDRESS_URl_END}`
  //     // );
  //     let response = await ApiSauce.get(
  //       `${GOOGLE_ADDRESS_URL},${latitude},${longitude},${GOOGLE_ADDRESS_URl_END}`
  //     );
  //     let responseJson = await response.json();
  //     return responseJson.results[0];
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // const url = ${GOOGLE_ADDRESS_URL},${latitude},${longitude},${GOOGLE_ADDRESS_URl_END}`
  //   // fetch(myRequest)
  //   //   .then(response => {
  //   //     if (response.status === 200) {
  //   //       return response.json();
  //   //     } else {
  //   //       throw new Error("Something went wrong on api server!");
  //   //     }
  //   //   })
  //   //   .then(response => {
  //   //     console.debug(response);
  //   //     // ...
  //   //   })
  //   //   .catch(error => {
  //   //     console.error(error);
  //   //   });
  // }

}

export default new Util();
