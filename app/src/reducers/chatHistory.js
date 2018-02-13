// @flow
import _ from "lodash";
import Immutable from "seamless-immutable";
import * as types from "../actions/ActionTypes";

const initialState = Immutable({
  failure: false,
  isFetching: false,
  errorMessage: "",
  data: [],
  page: {},
  lastId: "",
  isFinishLoading: true,
  invalidUser: false
});

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.CHAT_HISTORY.REQUEST:
      return Immutable.merge(state, {
        isFetching: true,
        lastId: action.lastId,
        isFinishLoading: false,
        invalidUser: false
      });
    case types.CHAT_HISTORY.SUCCESS: {
      const apiHistory = action.data.history || [];
      const isFinishLoading =
        !apiHistory.length || apiHistory.length < action.limit;
      const newData = action.lastId !== "" ? _.cloneDeep(state.data) : [];

      //text: apiHistory[i].message,

      for (let i = 0; i < apiHistory.length; i += 1) {
        const newMessage = {
          _id: apiHistory[i]._id,
          text: apiHistory[i].body || apiHistory[i].message,
          createdAt: apiHistory[i].created_at,
          user: {
            _id: apiHistory[i].user.user_id,
            name: apiHistory[i].user.username,
            avatar: apiHistory[i].user.userAvatar
          }
        };
        newData.push(newMessage);
      }

      return Immutable.merge(state, {
        failure: false,
        isFetching: false,
        errorMessage: "",
        data: newData,
        page: action.data.page,
        isFinishLoading,
        invalidUser: false
      });
    }

    case types.ADD_CHAT: {
      const newData = _.concat(action.data, state.data);
      return Immutable.merge(state, {
        data: newData
      });
    }

    case types.CHAT_HISTORY.FAILURE: {
      const isFinishLoading = state.data.length === 0 ? true : false;
      return Immutable.merge(state, {
        failure: true,
        isFetching: false,
        invalidUser: action.invalidUser,
        errorMessage: action.errorMessage,
        isFinishLoading
      });
    }

    case types.CHAT_HISORY_CLEAR: {
      return initialState;
    }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
