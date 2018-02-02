// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: []
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.CHAT_LIST.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.CHAT_LIST.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data && action.data.history ? action.data.history : []
      });
    case types.CHAT_LIST.FAILURE:
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
