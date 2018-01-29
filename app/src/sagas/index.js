import { fork } from "redux-saga/effects";
import init from "./init";
// import socialLogin from "./socialLogin";
// import attachmentFile from "./attachmentFile";

export default function* root() {
  yield fork(init);
  // yield fork(attachmentFile);
}
