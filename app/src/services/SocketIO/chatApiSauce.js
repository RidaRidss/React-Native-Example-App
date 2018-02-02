import base64 from "base-64";
import { create } from "apisauce";
import { Alert } from "react-native";
import { BASE_URL, PORT, API_TIMEOUT } from "./constants";

const api = create({
  baseURL: `${BASE_URL}:${PORT}`,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: API_TIMEOUT
});

class ChatApiSauce {
  async post(url, data, headers) {
    const response = await api.post(url, data, { headers });

    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        // if (response.status !== 200) {
        //   Alert.alert(error.title, error.message, [{ text: "OK" }]);
        // }

        if (response.status === 500) {
          reject(response);
        }
        reject(response.data);
      }
    });
  }
}

export default new ChatApiSauce();
