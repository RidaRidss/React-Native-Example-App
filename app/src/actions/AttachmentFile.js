// @flow

import { ATTACHMENT_FILE, ATTACHMENT_FILE_CLEAR } from "./ActionTypes";

export function request(
  files: array,
  index: number,
  api: Object,
  payload: Object
) {
  return {
    files,
    index,
    api,
    payload,
    type: ATTACHMENT_FILE.REQUEST
  };
}

export function success(data: Object, index: number, isFetching: boolean) {
  return {
    data,
    index,
    isFetching,
    type: ATTACHMENT_FILE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: ATTACHMENT_FILE.FAILURE
  };
}

export function clearAttachedFiles() {
  return {
    type: ATTACHMENT_FILE_CLEAR
  };
}
