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

export const NETWORK_INFO = "NETWORK_INFO";
export const EMPTY = createRequestTypes("EMPTY");

// event related action types

// file upload action type
// export const ATTACHMENT_FILE = createRequestTypes("ATTACHMENT_FILE");

// export const SOCIAL_LOGIN = createRequestTypes("SOCIAL_LOGIN");

// user location actions
// export const USER_LOCATION = createRequestTypes("USER_LOCATION");
