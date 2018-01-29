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
    case types.ATTACHMENT_FILE.REQUEST:
      return Immutable.merge(state, {
        isFetching: true
      });
    case types.ATTACHMENT_FILE.SUCCESS:
      const data = _.cloneDeep(state.data);
      data[action.index] = action.data;
      return Immutable.merge(state, {
        failure: false,
        isFetching: action.isFetching,
        errorMessage: "",
        data
      });
    case types.ATTACHMENT_FILE.FAILURE:
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        errorMessage: action.errorMessage
      });
    case types.ATTACHMENT_FILE_CLEAR:
      return initialState;
    default:
      return state;
  }
};
