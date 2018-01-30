// @flow

import { LOGOUT, SOCIAL_LOGIN } from "./ActionTypes";

export function request(api, payload: Object) {
  return {
    api,
    payload,
    type: SOCIAL_LOGIN.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: SOCIAL_LOGIN.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: SOCIAL_LOGIN.FAILURE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
