import { take, takelatest, put, call, fork, select } from "redux-saga/effects";
import { Actions } from "react-native-router-flux";
import _ from "lodash";
import ApiSauce from "../services/ApiSauce";
import { USER } from "../actions/ActionTypes";
import { success, failure } from "../actions/User";
import { getUser } from "../reducers/selectors";

// generic method to call requests from api sauce

function callRequest(url, data) {
  return ApiSauce.post(url, data);
}
// generator method syntax function*

function* watchRequest() {
  while (true) {
    // take will serve once , but in this logic this take will serve on every request b/c of while loop
    // ============ YIELD will wait for resolving request everywhere ============
    const { url, payload } = yield take(USER.REQUEST);
    try {
      // =========== CALL will accept nolimit params including callReququest 'that is simple calling method that will return a promise from requests defined in api sauce'

      const response = yield call(callRequest, url, payload);

      if (response.data && response.data.user) {
        // =========== here PUT will accept promise's success response from api , yield will also wait here to resolve this chunk of code
        yield put(success(response.data.user));
        // do whatever with this response here
        const { data } = yield select(getUser);
        if (
          response.data.user.attributes &&
          response.data.user.attributes.gender &&
          response.data.user.attributes.gender.value &&
          response.data.user.attributes.preference &&
          response.data.user.attributes.preference.value &&
          response.data.user.attributes.running_level &&
          response.data.user.attributes.running_level.value &&
          response.data.user.attributes.speed &&
          response.data.user.attributes.speed.value &&
          !_.isEmpty(response.data.user.attributes.dob)
        ) {
          Actions.dashboard();
        } else Actions.completeProfile({ type: "reset" });
      } else {
        yield put(success(response.data));
        const { data } = yield select(getUser);
        if (
          response.data.attributes &&
          response.data.attributes.gender &&
          response.data.attributes.gender.value &&
          response.data.attributes.preference &&
          response.data.attributes.preference.value &&
          response.data.attributes.running_level &&
          response.data.attributes.running_level.value &&
          response.data.attributes.speed &&
          response.data.attributes.speed.value &&
          !_.isEmpty(response.data.attributes.dob)
        ) {
          Actions.dashboard();
        } else Actions.completeProfile({ type: "reset" });
      }
    } catch (err) {
      yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
