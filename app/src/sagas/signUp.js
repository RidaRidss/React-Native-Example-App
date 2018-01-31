import { take, put, call, fork } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/SignUp";
import { API_SIGN_UP } from "../config/WebService";

function callRequest(data) {
  return ApiSauce.post(API_SIGN_UP, data);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.SIGN_UP.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data.user));
      Actions.detail({ type: "reset" });
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
