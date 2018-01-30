import { Actions } from "react-native-router-flux";
import { take, put, call, fork } from "redux-saga/effects";
import _ from "lodash";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { API_USER_EDIT } from "../config/WebService";
import { success, failure } from "../actions/UserEdit";

function callRequest(data) {
  return ApiSauce.post(API_USER_EDIT, data);
}

function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.USER_EDIT.REQUEST);
    try {
      const response = yield call(callRequest, payload);

      if (payload.latitude && payload.longitude) {
        yield put(success(response.data.user));
      } else {
        yield put(success(response.data.user));
        Actions.dashboard();
      }
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
