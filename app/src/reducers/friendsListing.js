// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
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
    case types.FRIENDS_LISTING.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.FRIENDS_LISTING.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.FRIENDS_LISTING.FAILURE:
      reuseableFunctions.showAlert("Error", action.errorMessage);
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
};
