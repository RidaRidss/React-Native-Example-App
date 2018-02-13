import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import SocketIO from "../../services/SocketIO";
import {
  URL,
  APP_TOKEN,
  CHAT_API_GET_MESSAGES
} from "../../services/SocketIO/constants";

import { GiftedChat } from "../../components";
import {
  request,
  clearHistory,
  addChat
} from "../../actions/ChatHistoryActions";
import NoInternetConnection from "../../components/EmptyComponent/NoInternetView";
import styles from "./styles";
import Utils from "../../util";

console.ignoredYellowBox = ["Setting a timer"];

class Chat extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    chatHistory: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    addChat: PropTypes.func.isRequired,
    clearHistory: PropTypes.func.isRequired,
    roomId: PropTypes.string,
    networkInfo: PropTypes.object.isRequired
  };

  static defaultProps = { roomId: "room00117" };

  constructor(props) {
    super(props);

    this._configureChatRoom();
  }

  state = {
    activeUsers: [],
    waitingUsers: [],
    activeUsersLimit: -1,
    waitingUsersLimit: -1,
    isConnecting: true,
    isConnected: false,
    isWaiting: false,
    isFull: false,
    isSomeoneWriting: undefined
  };

  componentWillMount() {}

  componentDidMount() {
    this._checkInternetAndConnect();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.networkInfo.isNetworkConnected &&
      !this.props.networkInfo.isNetworkConnected &&
      !nextProps.chatHistory.isFetching &&
      !this.state.isConnecting
    ) {
      setTimeout(() => {
        this._retry();
      }, 500);
    }
  }

  componentWillUnmount() {
    this._leaveRoomAndLeaveSocket();
    this.props.clearHistory();
  }

  _checkInternetAndConnect() {
    setTimeout(() => {
      if (this.props.networkInfo.isNetworkConnected) {
        this._connectAndGetMessages();
      } else {
        this.setState({
          isConnecting: false
        });
      }
    }, 200);
  }

  _connectAndGetMessages() {
    this._connectSocketAndJoinRoom();
    this._fetchMessages("");
  }

  // SOCKET FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////////////////

  chatObject = {};

  _configureChatRoom() {
    const { user, roomId } = this.props;
    const userName =
      user.attributes && user.attributes.name ? user.attributes.name : "";
    const userId = user.entity_auth_id;

    this.chatObject = {
      url: URL,
      appToken: APP_TOKEN,
      roomId,
      userId,
      userName,
      userAvatar: this._getGallery()
    };
  }

  _getGallery = data => {
    if (data && data.gallery && data.gallery.length) {
      return data.gallery[0].file;
    } else if (data && data.attributes.fb_image) {
      return data.attributes.fb_image;
    }

    return "";
  };

  _leaveRoomAndLeaveSocket() {
    const { appToken, roomId, userId } = this.chatObject;
    SocketIO.leaveRoom(roomId, userId, appToken);
    SocketIO.disconnect();

    this.setState({
      isConnecting: false,
      isConnected: false,
      isWaiting: false,
      isFull: false
    });
  }

  _startTyping(text) {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    } else if (text && !this.iAmWriting) {
      this.iAmWriting = true;

      const { appToken, roomId, userId } = this.chatObject;
      SocketIO.userTyping(roomId, userId, appToken);
    }
  }

  _stoppedTyping(text) {
    if (this.iAmWriting) {
      this.typingTimeout = setTimeout(() => {
        this.iAmWriting = false;
        this.typingTimeout = undefined;

        const { appToken, roomId, userId } = this.chatObject;
        SocketIO.userStoppedTyping(roomId, userId, appToken);
      }, 3000);
    }
  }

  _onSend = (messages = []) => {
    console.log(messages, typeof messages);

    const { appToken, roomId, userId } = this.chatObject;
    SocketIO.sendMessage(messages[0].text, roomId, userId, appToken);

    if (this.typingTimeout && this.iAmWriting) {
      clearTimeout(this.typingTimeout);
      this.iAmWriting = false;
      this.typingTimeout = undefined;
      SocketIO.userStoppedTyping(roomId, userId, appToken);
    }

    this.list.scrollTo({ y: this.scrollLastOffset, animated: false });
  };

  _connectSocketAndJoinRoom() {
    const { url, roomId, userId, userName, userAvatar } = this.chatObject;
    SocketIO.disconnect();

    SocketIO.connect(
      () => {
        SocketIO.joinRoom(roomId, [
          {
            user_id: userId,
            is_join: 1,
            type: "user_id",
            identifier: userId,
            username: userName,
            profile_image: userAvatar
          }
        ]);

        SocketIO.onMessageReceived((user, message) => {
          const newMessage = {
            _id: Math.random() * 10,
            text: message,
            createdAt: new Date(),
            user: {
              _id: user.user_id,
              name: user.username,
              avatar: user.userAvatar
            }
          };
          this.props.addChat(newMessage);
        });

        SocketIO.onUserTyping(user => {
          this.setState({
            isSomeoneWriting: user
          });
        });

        SocketIO.onUserStoppedTyping(user => {
          this.setState({
            isSomeoneWriting: undefined
          });
        });

        SocketIO.onNewUserConnected(user => {
          if (user === userId) {
            this.setState({
              isConnecting: false,
              isConnected: true,
              isWaiting: false,
              isFull: false
            });

            const { invalidUser } = this.props.chatHistory;
            if (invalidUser) {
              this._fetchMessages("");
            }
          }
        });

        SocketIO.onConnectedUsers(
          (connectedUsers, waitingUsers, maxLimit, queueLimit) => {
            console.log(connectedUsers, waitingUsers, maxLimit, queueLimit);
            this.setState({
              activeUsersLimit: maxLimit,
              waitingUsersLimit: queueLimit,
              activeUsers: connectedUsers,
              waitingUsers: waitingUsers
            });
          }
        );

        SocketIO.onRoomFull(() => {
          this.setState({
            isConnecting: false,
            isConnected: false,
            isWaiting: false,
            isFull: true
          });
        });
      },
      () => {
        setTimeout(() => {
          if (this.props.networkInfo.isNetworkConnected) {
            this._retry();
          } else {
            this.setState({
              isConnecting: false,
              isConnected: false,
              isWaiting: false,
              isFull: false,
              isSomeoneWriting: undefined
            });
          }
        }, 500);
      },
      url,
      () => {
        if (this.state.isConnected || this.state.isConnecting) {
          this.setState({
            isConnecting: false,
            isConnected: false,
            isWaiting: false,
            isFull: false,
            isSomeoneWriting: undefined
          });
        }
      }
    );
  }

  // REST API FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////////////////

  _fetchMessages = lastId => {
    const { user, roomId } = this.props;

    const payload = {
      token: APP_TOKEN,
      identifier: user.entity_auth_id,
      room: roomId,
      limit: 20,
      currentPage: 1
    };

    /*
    const payload = {
      token: APP_TOKEN,
      identifier: "10000",
      room: roomId,
      limit: 20,
      currentPage: 1
    };
    */

    if (lastId !== "") {
      payload.last_id = lastId;
      payload.offset = 0;
    }

    this.props.request(CHAT_API_GET_MESSAGES, payload, lastId);
  };

  _onLoadEarlier = () => {
    const { data } = this.props.chatHistory;
    const length = data.length - 1;
    const message = data[length];
    const lastMessageId = message._id;
    this._fetchMessages(lastMessageId);
  };

  // RENDER UI FUNCTIONS  /////////////////////////////////////////////////////////////////////////////////////////////////

  _renderConnected() {
    const { userId } = this.chatObject;

    const {
      isFinishLoading,
      lastId,
      isFetching,
      data
    } = this.props.chatHistory;
    const isLoadingEarlier = isFetching && lastId !== ""; // loading eariler messages
    const loadEarlier = !isFinishLoading;

    return (
      <View style={styles.container}>
        <GiftedChat
          user={{
            _id: userId
          }}
          loadEarlier={loadEarlier}
          onLoadEarlier={this._onLoadEarlier}
          isLoadingEarlier={isLoadingEarlier}
          renderAvatarOnTop
          scrollEventThrottle={16}
          messages={data}
          renderFooter={this._renderFooter}
          onSend={messages => this._onSend(messages)}
          listViewProps={{
            ref: ref => {
              this.list = ref;
            },
            onScroll: (event: Object) => {
              this.scrollLastOffset = event.nativeEvent.contentOffset.y;
            }
          }}
          onInputTextChanged={text => {
            this._startTyping(text);
            this._stoppedTyping(text);
          }}
        />
      </View>
    );
  }

  _renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        {this.state.isSomeoneWriting && (
          <Text style={styles.footerText}>
            {this.state.isSomeoneWriting.username} is typing
          </Text>
        )}
      </View>
    );
  };

  _renderConnecting() {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );
  }

  _retry() {
    if (this.props.networkInfo.isNetworkConnected === true) {
      this.setState({
        isConnecting: true,
        isConnected: false,
        isSomeoneWriting: undefined
      });
      this._connectAndGetMessages();
    } else {
      // check net
      Utils.noInternetMessage();
    }
  }

  _renderConnectButton() {
    return (
      <NoInternetConnection
        message="Unable to connect to chat server.Please check your internet connection"
        onRetryPress={() => this._retry()}
      />
    );
  }

  render() {
    const { isFetching, lastId } = this.props.chatHistory;
    const { isConnecting, isConnected } = this.state;
    const isReadyToChat = (!isFetching || lastId !== "") && isConnected;
    const isError = !isConnected && !isConnecting;
    const isLoading = !isReadyToChat && !isError;

    return (
      <View style={styles.container}>
        {isLoading && this._renderConnecting()}
        {isReadyToChat && this._renderConnected()}
        {isError && this._renderConnectButton()}
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user.data,
  chatHistory: store.chatHistory,
  networkInfo: store.networkInfo
});

const actions = { request, clearHistory, addChat };

export default connect(mapStateToProps, actions)(Chat);
