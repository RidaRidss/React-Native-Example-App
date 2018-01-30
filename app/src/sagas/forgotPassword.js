import { take, put, call, fork } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/ForgotPassword";
import { API_FORGOT_PASSWORD } from "../config/WebService";

function callRequest(data) {
  return ApiSauce.post(API_FORGOT_PASSWORD, data);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.FORGOT_PASSWORD.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      Actions.login();
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
