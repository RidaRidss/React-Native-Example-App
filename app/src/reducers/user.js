// @flow
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";
import reuseableFunctions from "../reusableFunction/reuseableFunction";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: {}
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.SIGN_UP.REQUEST:
    case types.SIGN_IN.REQUEST:
    case types.USER.REQUEST:
    case types.USER_EDIT.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.SIGN_IN.SUCCESS:
    case types.SIGN_UP.SUCCESS:
    case types.USER.SUCCESS:
    case types.USER_EDIT.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.SIGN_IN.FAILURE:
    case types.SIGN_UP.FAILURE:
    case types.USER.FAILURE:
    case types.USER_EDIT.FAILURE:
      reuseableFunctions.showAlert("Error", action.errorMessage);
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
