import { take, put, call, fork } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/ApiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/FriendsListingActions";
import { API_ENTITY_LISTING_SEARCH } from "../config/WebService";

function callRequest(data) {
  return ApiSauce.post(API_ENTITY_LISTING_SEARCH, data);
}
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.FRIENDS_LISTING.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response.data.user));
      console.log("users response from saga for friends list");
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
