import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import SocketIO from "../../services/SocketIO";
import {
  URL,
  APP_TOKEN,
  CHAT_API_GET_MESSAGES
} from "../../services/SocketIO/constants";

import { GiftedChat } from "../../components";
// import { GiftedChat } from "react-native-gifted-chat";
import { request, clearHistory } from "../../actions/ChatHistoryActions";

console.ignoredYellowBox = ["Setting a timer"];

class Chat extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    chatHistory: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    clearHistory: PropTypes.func.isRequired
  };

  static defaultProps = {};

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
    isSomeoneWriting: undefined,
    messages: []
  };

  componentDidMount() {
    this._fetchMessages(true);
    this._connectSocketAndJoinRoom();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.chatHistory, this.props.chatHistory)) {
      //console.log("chat history 22", nextProps.chatHistory.data);
      this._updateMessageList(nextProps.chatHistory.data);
    }
  }

  componentWillUnmount() {
    this._leaveRoomAndLeaveSocket();
    this.props.clearHistory();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  _updateMessageList = chatHistory => {
    const stateMessages = _.cloneDeep(this.state.messages);

    for (let i = 0; i < chatHistory.length; i++) {
      const newMessage = {
        _id: chatHistory[i]._id,
        text: chatHistory[i].message,
        createdAt: chatHistory[i].created_at,
        user: {
          _id: chatHistory[i].user.user_id,
          name: chatHistory[i].user.username
          // avatar: user.profile_image
        }
        // sent: true
        // received: true
      };

      stateMessages.push(newMessage);

      // copyMessages = GiftedChat.append(copyMessages, newMessage);
    }
    this.setState({ messages: stateMessages });
  };

  _fetchMessages = reset => {
    const { user, chatHistory, roomId } = this.props;

    const payload = {
      token: APP_TOKEN,
      identifier: user.entity_id,
      room: roomId,
      limit: 20,
      currentPage: reset ? 1 : chatHistory.currentPage + 1
    };

    this.props.request(CHAT_API_GET_MESSAGES, payload);
  };

  chatObject = {};

  _configureChatRoom() {
    const { user, roomId } = this.props;
    console.log("hello user", user);
    const userName =
      user.attributes && user.attributes.name ? user.attributes.name : "";
    const userId = user.entity_id;

    this.chatObject = {
      url: URL,
      appToken: APP_TOKEN,
      roomId,
      userId,
      userName,
      userAvatar: ""
    };
  }

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

  _renderConnecting() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
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

  _renderConnected() {
    const { userId } = this.chatObject;
    const { chatHistory } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          user={{
            _id: userId
          }}
          renderAvatarOnTop
          loadEarlier={chatHistory.currentPage < chatHistory.lastPage} //={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={chatHistory.isFetching}
          scrollEventThrottle={16}
          messages={this.state.messages}
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
              avatar: user.profile_image
            }
            // sent: true
            // received: true
          };

          console.log("append message");

          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessage)
          }));
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
        this.setState({
          isConnecting: false,
          isConnected: false,
          isWaiting: false,
          isFull: false
        });
      },
      url
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

  _renderConnectButton() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text onPress={() => this._connectSocketAndJoinRoom()}>
          Connect with chat Room
        </Text>
      </View>
    );
  }

  render() {
    const { isConnecting, isConnected } = this.state;
    const { user, chatHistory, roomId } = this.props;
    return (
      <View style={styles.container}>
        {isConnected && this._renderConnected()}
        {isConnecting && this._renderConnecting()}
        {!isConnected && !isConnecting && this._renderConnectButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  footerContainer: {
    margin: 8,
    height: 10
  },
  footerText: {
    fontStyle: "italic"
  }
});

const mapStateToProps = store => ({
  user: store.user.data,
  chatHistory: store.chatHistory
});

const actions = { request, clearHistory };

export default connect(mapStateToProps, actions)(Chat);
