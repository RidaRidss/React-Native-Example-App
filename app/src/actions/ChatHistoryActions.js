import { CHAT_HISTORY, CHAT_HISORY_CLEAR, ADD_CHAT } from "./ActionTypes";

export function request(url: string, payload: Object, lastId: String) {
  return {
    url,
    payload,
    lastId,
    type: CHAT_HISTORY.REQUEST
  };
}

export function success(data: Object, lastId: String, limit: number) {
  return {
    data,
    lastId,
    limit,
    type: CHAT_HISTORY.SUCCESS
  };
}

export function failure(errorMessage: Object, invalidUser: boolean) {
  return {
    errorMessage,
    invalidUser,
    type: CHAT_HISTORY.FAILURE
  };
}

export function clearHistory() {
  return {
    type: CHAT_HISORY_CLEAR
  };
}

export function addChat(data: Object) {
  return {
    data,
    type: ADD_CHAT
  };
}
