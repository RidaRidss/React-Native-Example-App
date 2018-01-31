// =========== when app starts this method will run initially without any force

import { LOAD } from "redux-storage";
import { take, fork, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import { getUser } from "../reducers/selectors";

function* watchReduxLoadFromDisk() {
  while (true) {
    yield take(LOAD);
    try {

   // ============ getting user detail first when app starts , if user data exists , we will be on detail page ====================

      const { data } = yield select(getUser);
      if (data.entity_auth_id) {
        Actions.detail();
      }
    } catch (err) {
      console.warn("saga watchReduxLoadFromDisk error: ", err);
    }
  }
}

export default function* root() {
  yield fork(watchReduxLoadFromDisk);
}
