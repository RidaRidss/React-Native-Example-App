// @flow

import { SIGN_UP } from "./ActionTypes";

export function request(payload: Object) {
  return {
    payload,
    type: SIGN_UP.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SIGN_UP.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SIGN_UP.FAILURE
  };
}
