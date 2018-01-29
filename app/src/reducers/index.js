import { combineReducers } from "redux";

import navigator from "./navigator";
// import socialLogin from "./socialLogin";
// import attachmentFile from "./attachmentFile";
// import networkInfo from "./networkInfo";
// import userLocation from "./userLocation";


export default combineReducers({
  route: navigator,
  // attachmentFile,
});
