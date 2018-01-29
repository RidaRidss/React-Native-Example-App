// @flow

import { DEVICE_LOCATION } from "./ActionTypes";

export default function deviceLocationListener(location: Object) {
  return {
    type: DEVICE_LOCATION,
    location
  };
}
