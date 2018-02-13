// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

// empty action type , Demo to create an action type
export const EMPTY = createRequestTypes("EMPTY");

// network related action type
export const NETWORK_INFO = "NETWORK_INFO";

// get user device location action type
export const USER_LOCATION = createRequestTypes("USER_LOCATION");

// file upload action type
export const ATTACHMENT_FILE = createRequestTypes("ATTACHMENT_FILE");

// user related action types
export const SOCIAL_LOGIN = createRequestTypes("SOCIAL_LOGIN");
export const USER = createRequestTypes("USER");
export const SIGN_IN = createRequestTypes("SIGN_IN");
export const SIGN_UP = createRequestTypes("SIGN_UP");
export const USER_EDIT = createRequestTypes("USER_EDIT");
export const FORGOT_PASSWORD = createRequestTypes("FORGOT_PASSWORD");
export const CHANGE_PASSWORD = createRequestTypes("CHANGE_PASSWORD");
// export const CHAT_LIST = createRequestTypes("CHAT_LIST");
// export const CHAT_HISTORY = createRequestTypes("CHAT_HISTORY");
// export const CHAT_HISORY_CLEAR = "CHAT_HISORY_CLEAR";
export const CHAT_HISTORY = createRequestTypes("CHAT_HISTORY");
export const CHAT_HISORY_CLEAR = "CHAT_HISORY_CLEAR";
export const ADD_CHAT = "ADD_CHAT";

export const DELETE_CHATS = createRequestTypes("DELETE_CHATS");
export const DELETE_CHAT_LOCALLY = "DELETE_CHAT_LOCALLY";
export const DELETE_CHAT_LISTING_LOCALLY = "DELETE_CHAT_LISTING_LOCALLY";
export const FRIENDS_LISTING = createRequestTypes("FRIENDS_LISTING");
export const LOGOUT = "LOGOUT";
