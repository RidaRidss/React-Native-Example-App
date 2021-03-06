export const BASE_URL = "api url";
export const API_USER_NAME = "apiuser";
export const API_PASSWORD = "apipass123";
export const API_TIMEOUT = 30000;

// API ROUTE VARAIABLE
export const API = "/api/";

// GET API LOGS BY CHANGE API LOG_VALUE "TRUE"
export const API_LOG = true;

// USER API ROUTES
export const API_SIGN_UP = `${API}entity_auth`;
export const API_USER_EDIT = `${API}entity_auth/edit_profile`;
export const API_SIGN_IN = `${API}entity_auth/signin`;
export const API_USER_SOCIAL_LOGIN = `${API}entity_auth/social_login`;
export const API_FORGOT_PASSWORD = `${API}entity_auth/forgot_request`;
export const API_CHANGE_PASSWORD = `${API}entity_auth/change_password`;

// GETTING LISTING API FOR FRIENDS

export const API_ENTITY_LISTING_SEARCH = `${API}system/entities/listing`;

// DELETE ROUTE

export const API_ENTITY_DELETE = `${API}system/entities/delete`;

// UPLOAD FILE ROUTE
export const API_ENTITY_ATTACHMENT_FILE = `${API}system/attachment/save`;

// REQUEST FAIL ERRORS

export const ERROR_REQUEST_TIMEOUT = {
  error: 1,
  title: "Request taking too much time",
  message:
    "We are sorry. It seems like something went wrong with your Internet connection"
};
export const ERROR_SERVER_CONNECTION = {
  error: 1,
  title: "Connection Error",
  message: "Server not available, bad dns."
};
export const ERROR_REQUEST_CANCEL = {
  error: 1,
  title: "Request Canceled",
  message: "You have canceled request."
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  error: 1,
  title: "Network not available",
  message: "Please connect to the working Internet."
};
export const ERROR_SOMETHING_WENT_WRONG = {
  error: 1,
  title: "Whoops",
  message: "Looks like something went wrong."
};
export const ERROR_CLIENT = {
  error: 1,
  title: "Whoops",
  message: "Looks like we did something went wrong."
};
