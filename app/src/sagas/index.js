// ======== init will serve first then fork other request on behalf of store request ============= //

import init from "./init";
import { fork } from "redux-saga/effects";
import signUp from "./signUp";
import signIn from "./signIn";
import user from "./user";
import editUser from "./editUser";
import forgotPassword from "./forgotPassword";
import changePassword from "./changePassword";
import attachmentFile from "./attachmentFile";

export default function* root() {
  yield fork(init);
  yield fork(signUp);
  yield fork(signIn);
  yield fork(user);
  yield fork(editUser);
  yield fork(forgotPassword);
  yield fork(changePassword);
  yield fork(attachmentFile);
}
