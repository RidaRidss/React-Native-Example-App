// @flow

import { USER_EDIT } from "./ActionTypes";

export function request(payload: Object) {
  return {
    payload,
    type: USER_EDIT.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: USER_EDIT.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: USER_EDIT.FAILURE
  };
}
