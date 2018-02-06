//@flow
import SocketIOClient from "socket.io-client";

import { URL, APP_TOKEN } from "./constants";

let isConnectedWithSocket = false;
const LOG = true;

class SocketIO {
  /**
   *
   *
   * @param {function} connectCallBack
   * @param {function} disconnectCallBack
   * @param {string} [url=URL]
   * @memberof SocketIO
   */
  connect(connectCallBack, disconnectCallBack, url: string = URL): void {
    this.socket = SocketIOClient(url, {
      transports: ["websocket"]
    });

    console.log("connect socket.io");

    // alert("connected to socket.io server");
    if (!isConnectedWithSocket) {
      // Global events are bound against socket

      this.socket.on("connect_error", function() {
        console.log("connect_error");
        // alert("socket.io server connection failed");
      });

      this.socket.on("connect", () => {
        isConnectedWithSocket = true;

        if (LOG) {
          console.log("Connect to the socket.io");
        }

        if (connectCallBack) {
          connectCallBack();
        }
      });
    } else {
      //alert("2");
      //console.warn("Already connected with socket");
      if (connectCallBack) {
        connectCallBack();
      }
    }

    this.socket.on("disconnect", () => {
      //alert("Disconnect");
      isConnectedWithSocket = false;

      if (LOG) {
        console.log("Disconnect from socket.io");
      }

      if (disconnectCallBack) {
        disconnectCallBack();
      }
    });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  // ------------------ EMITS ------------------

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   * @param {string} [appToken=APP_TOKEN]
   * @memberof SocketIO
   */
  joinRoom(roomId: string, users: array, appToken: string = APP_TOKEN): void {
    this.socket.emit("join", roomId, appToken, users);
  }

  /**
   *
   *
   * @param {string} message
   * @param {string} roomId
   * @param {string} userId
   * @param {string} [appToken=APP_TOKEN]
   * @memberof SocketIO
   */
  sendMessage(
    message: string,
    roomId: string,
    userId: string,
    appToken: string = APP_TOKEN
  ): void {
    this.socket.emit("message", message, appToken, userId, roomId);
  }

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   * @param {string} [appToken=APP_TOKEN]
   * @memberof SocketIO
   */
  userTyping(roomId: string, userId: string, appToken: string = APP_TOKEN) {
    this.socket.emit("userontyping", appToken, userId, roomId);
  }

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   * @param {string} [appToken=APP_TOKEN]
   * @memberof SocketIO
   */
  userStoppedTyping(
    roomId: string,
    userId: string,
    appToken: string = APP_TOKEN
  ) {
    this.socket.emit("stoptyping", appToken, userId, roomId);
  }

  /**
   *
   *
   * @param {string} roomId
   * @param {string} userId
   * @param {string} [appToken=APP_TOKEN]
   * @memberof SocketIO
   */
  leaveRoom(roomId: string, userId: string, appToken: string = APP_TOKEN) {
    if (LOG) {
      console.log("leave", roomId, appToken, userId);
    }
    this.socket.emit("leave", roomId, appToken, userId);
  }

  // ------------------ LISTENERS ------------------

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onConnectedUsers(callback): void {
    this.socket.on(
      "connected_user",
      (connectedUsers, waitingUsers, maxLimit, queueLimit) => {
        if (LOG) {
          console.log(
            "onConnectedUsers",
            connectedUsers,
            waitingUsers,
            maxLimit,
            queueLimit
          );
        }

        if (callback) {
          callback(connectedUsers, waitingUsers, maxLimit, queueLimit);
        }
      }
    );
  }

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onNewUserConnected(callback): void {
    this.socket.on("new_user_connected", user => {
      if (LOG) {
        console.log("onNewUserConnected", user);
      }

      if (callback) {
        callback(user);
      }
    });
  }

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onMessageReceived(callback): void {
    this.socket.on("message", (user, message) => {
      if (LOG) {
        console.log("onMessageReceived", user, message);
      }

      if (callback && message) {
        callback(user, message);
      }
    });
  }

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onUserTyping(callback): void {
    this.socket.on("user_typing", user => {
      if (LOG) {
        console.log("onUserTyping", user);
      }

      if (callback) {
        callback(user);
      }
    });
  }

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onUserStoppedTyping(callback): void {
    this.socket.on("user_typing_stop", user => {
      if (LOG) {
        console.log("onUserStoppedTyping", user);
      }

      if (callback) {
        callback(user);
      }
    });
  }

  /**
   *
   *
   * @param {function} callback
   * @memberof SocketIO
   */
  onRoomFull(callback): void {
    this.socket.on("discon", (roomId, msg) => {
      if (LOG) {
        console.log("onRoomFull", roomId, msg);
      }

      if (callback) {
        callback(roomId, msg);
      }
    });
  }
}

export default new SocketIO();
