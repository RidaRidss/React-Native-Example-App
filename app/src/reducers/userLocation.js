import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  isFetching: false,
  failure: false,
  errorMessage: "",
  data: '{"coords":{}}',
  permissionGranted: null
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.USER_LOCATION.REQUEST:
      return Immutable.merge(state, {
        isFetching: action.permissionGranted === "granted",
        failure: false,
        errorMessage: "",
        permissionGranted: action.permissionGranted
      });
    case types.USER_LOCATION.SUCCESS:
      console.log("user location success reducer called : ", action.location);
      return Immutable.merge(state, {
        isFetching: false,
        failure: false,
        errorMessage: "",
        data: action.location
      });
    case types.USER_LOCATION.FAILURE:
      return Immutable.merge(state, {
        isFetching: false,
        failure: true,
        errorMessage: action.errorMessage
      });

    default:
      return state;
  }
};
