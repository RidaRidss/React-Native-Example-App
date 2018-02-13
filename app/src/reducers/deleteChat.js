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
    case types.DELETE_CHATS.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.DELETE_CHATS.SUCCESS:
      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: action.data
      });
    case types.DELETE_CHATS.FAILURE:
      reuseableFunctions.showAlert("Error", action.errorMessage);
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case types.DELETE_CHAT_LOCALLY:
      const deleteTempArray = _.cloneDeep(state.data);
      deleteTempArray.splice(action.index, 1);
      return Immutable.merge(state, {
        data: deleteTempArray
      });
    default:
      return state;
  }
};
