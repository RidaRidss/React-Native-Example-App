import { takeLatest, put, call } from "redux-saga/effects";
import * as types from "../actions/ActionTypes";
import {
  API_ENTITY_ATTACHMENT_FILE,
  API_USER_EDIT,
} from "../config/WebService";
import ApiSauce from "../services/ApiSauce";
import { IMAGE_ENTITY_TYPE_ID } from "../constants";
import { success, failure } from "../actions/AttachmentFile";
import { request as userEdit } from "../actions/UserEdit";

function callRequest(data) {
  return ApiSauce.postImage(API_ENTITY_ATTACHMENT_FILE, data, {
    "Content-Type": "multipart/form-data"
  });
}

function* watchRequest(action) {
  const { files, index, api, payload } = action;
  const photo = {
    uri: files[index],
    type: "image/jpeg",
    name: "profile.jpg"
  };
  const data = new FormData();
  data.append("attachment_type_id", IMAGE_ENTITY_TYPE_ID);
  data.append("file", photo);
  let entityTypeId = payload.entity_type_id;

  try {
    const response = yield call(callRequest, data);
    // const newIndex = index + 1;
    // if (newIndex > 3) {
    //     yield put(success(response.data.attachment, index, false));
    //     Actions.pop();
    // } else {
    //     yield put(success(response.data.attachment, index, true));
    //     yield put(request(files, newIndex));
    // }

    if (api === API_USER_EDIT) {
      yield put(
        userEdit({
          ...payload,
          gallery_items: response.data.attachment.attachment_id
        })
      );
    }


    yield put(success(response.data.attachment, index, false));
  } catch (err) {
    yield put(failure(err.message));
  }
}

export default function* root() {
  yield takeLatest(types.ATTACHMENT_FILE.REQUEST, watchRequest);
}
