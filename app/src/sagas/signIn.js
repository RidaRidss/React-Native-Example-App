import { take, put, call, fork } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/SignIn";
import { API_SIGN_IN } from "../config/WebService";

function callRequest(data) {
  return ApiSauce.post(API_SIGN_IN, data);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.SIGN_IN.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data.user));
      if (
        response.data &&
        response.data.user){
          Actions.detail();
        }
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
