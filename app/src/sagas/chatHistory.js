import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import ApiSauce from "../services/SocketIO/chatApiSauce";
import { CHAT_HISTORY } from "../actions/ActionTypes";
import { success, failure } from "../actions/ChatHistoryActions";

function callPostRequest(url, data) {
  return ApiSauce.post(url, data);
}

function* watchRequest() {
  while (true) {
    const { url, payload, lastId } = yield take(CHAT_HISTORY.REQUEST);
    try {
      const response = yield call(callPostRequest, url, payload);
      // yield put(
      //   success(
      //     response && response.data
      //     //  && _.isEmpty(response.data)
      //     //   ? []
      //     //   : response.data,
      //     lastId,
      //     payload.limit
      //   )
      // );
      yield put(success(response.data, lastId, payload.limit));
    } catch (err) {
      const invalidUser =
        err && err.invalid_user && err.invalid_user === 1 ? true : false;

      yield put(failure(err && err.message, invalidUser));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
