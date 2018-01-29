import base64 from "base-64";
import { create } from "apisauce";
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  API_PASSWORD,
  API_USER_NAME,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_CLIENT,
  ERROR_REQUEST_TIMEOUT,
  ERROR_SERVER_CONNECTION,
  ERROR_NETWORK_NOT_AVAILABLE,
  ERROR_REQUEST_CANCEL
} from "../config/WebService";
import Utils from "../util";

const api = create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Basic ${base64.encode(`${API_USER_NAME}:${API_PASSWORD}`)}`
  },
  timeout: API_TIMEOUT
});

class ApiSauce {
  // for normal post requests
  async post(url, data, headers) {
    const mobileJson = { mobile_json: 1, ...data };
    const response = await api.post(url, mobileJson, headers);

    if (__DEV__ && API_LOG) {
      console.log(response);
    }

    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        let error = ERROR_SOMETHING_WENT_WRONG;

        switch (response.problem) {
          case "CLIENT_ERROR":
            error = ERROR_CLIENT;
            break;
          case "TIMEOUT_ERROR":
            error = ERROR_REQUEST_TIMEOUT;
            break;
          case "CONNECTION_ERROR":
            error = ERROR_SERVER_CONNECTION;
            break;
          case "NETWORK_ERROR":
            error = ERROR_NETWORK_NOT_AVAILABLE;
            Utils.noInternetMessage();
            break;
          case "CANCEL_ERROR":
            error = ERROR_REQUEST_CANCEL;
            break;
          default:
            // "SERVER_ERROR":
            error = { status: response.status, ...ERROR_SOMETHING_WENT_WRONG };
        }
        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }

  // for simple get request
  async get(url, data, headers) {
    const mobileJson = { mobile_json: 1, ...data };
    const response = await api.get(url, mobileJson, { headers });

    if (__DEV__ && API_LOG) {
      console.log(response);
    }
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }

  // for uploading images
  async postImage(url, data) {
    const response = await api.post(url, data);

    if (__DEV__ && API_LOG) {
      console.log(response);
    }
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }
        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }
}

export default new ApiSauce();
