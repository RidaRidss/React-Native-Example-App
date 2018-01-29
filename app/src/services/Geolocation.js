import _ from "lodash";

let watchID;
let myLastPosition;
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
};

class Geolocation {
  watchLocation() {
    watchID = navigator.geolocation.watchPosition(
      position => {
        if (!_.isEqual(position.coords, myLastPosition)) {
          myLastPosition = position.coords;
        }
      },
      null,
      geolocationOptions
    );
  }

  unWatchLocation() {
    if (this.watchID) {
      navigator.geolocation.clearWatch(this.watchID);
    }
  }
}

export default new Geolocation();
