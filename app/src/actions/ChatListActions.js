import { CHAT_LIST } from "./ActionTypes";

export function request(url: string, payload: Object) {
  return {
    url,
    payload,
    type: CHAT_LIST.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: CHAT_LIST.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CHAT_LIST.FAILURE
  };
}
