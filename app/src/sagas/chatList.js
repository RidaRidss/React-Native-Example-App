import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/SocketIO/chatApiSauce";
import { CHAT_LIST } from "../actions/ActionTypes";
import { success, failure } from "../actions/ChatListActions";

function callGetRequest(url, data) {
  return ApiSauce.get(url, data);
}

function callPostRequest(url, data) {
  return ApiSauce.post(url, data);
}

function* watchRequest() {
  while (true) {
    const { url, payload } = yield take(CHAT_LIST.REQUEST);
    try {
      const response = yield call(callPostRequest, url, payload);

      yield put(success(response && response.data ? response.data : []));
    } catch (err) {
      yield put(failure(err && err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
