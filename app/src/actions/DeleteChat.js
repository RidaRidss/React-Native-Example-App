// @flow

import { DELETE_CHATS } from "./ActionTypes";

export function request(payload: Object) {
  return {
    payload,
    type: DELETE_CHATS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: DELETE_CHATS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: DELETE_CHATS.FAILURE
  };
}
