import { take, put, call, fork } from "redux-saga/effects";
import { Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/DeleteChat";
import { API_ENTITY_DELETE } from "../config/WebService";

function callRequest(data) {
  return ApiSauce.post(API_ENTITY_DELETE, data);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.DELETE_CHATS.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      Actions.pop();
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
