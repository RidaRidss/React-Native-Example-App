// @flow

import { SIGN_IN } from "./ActionTypes";

export function request(payload: Object) {
  return {
    payload,
    type: SIGN_IN.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SIGN_IN.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SIGN_IN.FAILURE
  };
}
