import { Actions } from "react-native-router-flux";
import { take, put, call, fork } from "redux-saga/effects";
import { LoginManager } from "react-native-fbsdk";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_CHANGE_PASSWORD } from "../config/WebService";
import { success, failure } from "../actions/ChangePassword";
import { logout } from "../actions/User";
import reusableFunction from "../reusableFunction/reuseableFunction";

function callRequest(data) {
  return ApiSauce.post(API_CHANGE_PASSWORD, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data));
      reusableFunction.showAlert("Success", "Your password has been changed");
      Actions.pop();
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
