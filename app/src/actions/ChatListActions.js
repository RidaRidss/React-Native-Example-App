import {
  CHAT_LIST,
  UPDATE_CHAT_LOCALLY,
  DELETE_CHAT_LOCALLY
} from "./ActionTypes";

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

export function deleteChatLocally(index: number) {
  return {
    index,
    type: DELETE_CHAT_LOCALLY
  };
}

export function updateChatLocally(data: Object, chatIndex: number) {
  return {
    data,
    chatIndex,
    type: UPDATE_CHAT_LOCALLY
  };
}
