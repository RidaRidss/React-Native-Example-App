import { combineReducers } from "redux";

import navigator from "./navigator";
import networkInfo from "./networkInfo";
import userLocation from "./userLocation";
import user from "./user";
import forgotPassword from "./forgotPassword";
import changePassword from "./changePassword";
import attachmentFile from "./attachmentFile";
import chatHistory from "./chatHistory";
import chatList from "./chatList";

export default combineReducers({
  route: navigator,
  networkInfo,
  userLocation,
  user,
  forgotPassword,
  changePassword,
  attachmentFile,
  chatHistory,
  chatList
});
