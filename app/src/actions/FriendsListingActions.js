// @flow

import { FRIENDS_LISTING } from "./ActionTypes";

export function request() {
  return {
    type: FRIENDS_LISTING.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: FRIENDS_LISTING.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: FRIENDS_LISTING.FAILURE
  };
}
