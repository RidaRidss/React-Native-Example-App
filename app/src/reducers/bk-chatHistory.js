// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: [],
  page: {}
});

export default (state: Object = initialState, action: Object) => {
  //let stateData;
  //let data;

  switch (action.type) {
    case types.CHAT_HISTORY.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.CHAT_HISTORY.SUCCESS:
      console.log("action.data.history", action.data.history);
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data.history,
        page: action.data.page
      });
    case types.CHAT_HISTORY.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case types.CHAT_HISORY_CLEAR: {
      return initialState;
    }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
