import { CHAT_HISTORY, CHAT_HISORY_CLEAR } from "./ActionTypes";

export function request(url: string, payload: Object) {
  return {
    url,
    payload,
    type: CHAT_HISTORY.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: CHAT_HISTORY.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: CHAT_HISTORY.FAILURE
  };
}

export function clearHistory(index: number) {
  return {
    index,
    type: CHAT_HISORY_CLEAR
  };
}
