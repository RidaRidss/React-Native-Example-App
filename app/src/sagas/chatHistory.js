import { take, put, call, fork } from "redux-saga/effects";
import ApiSauce from "../services/SocketIO/chatApiSauce";
import { CHAT_HISTORY } from "../actions/ActionTypes";
import { success, failure } from "../actions/ChatHistoryActions";

function callPostRequest(url, data) {
  return ApiSauce.post(url, data);
}

function* watchRequest() {
  while (true) {
    const { url, payload } = yield take(CHAT_HISTORY.REQUEST);
    try {
      const response = yield call(callPostRequest, url, payload);
      yield put(success(response.data));
    } catch (err) {
      yield put(failure(err && err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
