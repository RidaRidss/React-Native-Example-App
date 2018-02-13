import { connect } from "react-redux";
import React, { Component } from "react";
import _ from "lodash";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";

import styles from "./styles";
import { Metrics, Colors, Fonts, Images } from "../../theme";
import { FlatList, ImageButton, Text, ButtonView } from "../../components";
import Swipeout from "react-native-swipeout";

import {
  CHAT_API_GET_THREAD,
  CHAT_API_GET_MESSAGES,
  APP_TOKEN
} from "../../services/SocketIO/constants";
import SocketIO from "../../services/SocketIO";
import { request } from "../../actions/ChatHistoryActions";
// import { request as requestDeleteChat } from "../../actions/DeleteChat";

// import { request, deleteChatLocally } from "../../actions/ChatListActions";

class Inbox extends Component {
  static propTypes = {
    data: PropTypes.array,
    user: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    roomId: PropTypes.string

    // deleteChatLocally: PropTypes.func.isRequired,
    // requestDeleteChat: PropTypes.func.isRequired
  };
  static defaultProps = { roomId: "room00117" };

  constructor(props) {
    super(props);
    this._fetchingUser();
  }

  componentDidMount() {
    this._fetchingUser();
    this.fetchInbox();
  }

  fetchInbox = () => {
    const { user, id, roomId } = this.props;
    console.log(roomId, "this is room id fetching from prop");
    console.log("inboxing ", this.props.user.data.entity_id);
    const payload = {
      token: APP_TOKEN,
      identifier: this.props.user.data.entity_id,
      roomId: roomId
    };
    // this.props.request(CHAT_API_GET_THREAD, payload);
  };

  onAddChatItem = () => {
    return null;
  };

  // onMsgClicked = index => {
  //   // const { chatList } = this.props;

  //   // const guests =
  //   //   chatList.data && chatList.data.length > 0
  //   //     ? chatList.data[index].partner
  //   //     : {};

  //   // if (guests && guests.length > 0) {
  //   //   console.log(
  //   //     "user name :",
  //   //     guests[0].username,
  //   //     "room id :",
  //   //     guests[0].room,
  //   //     "partner :",
  //   //     guests[0]
  //   //   );
  //   //   Actions.Chat({
  //   //     title: guests[0].username,
  //   //     guest: guests[0],
  //   //     roomId: guests.room
  //   //   });
  //   // }
  //   const { chatList } = this.props;
  //   console.log(chatList.data[index], "clicked chat data");
  //   const users =
  //     chatList.data && chatList.data.length > 0
  //       ? chatList.data[index].partner
  //       : {};
  //   const roomId = chatList.data[index].room;
  //   console.log("partner data :", users);
  //   console.log(chatList.data[index].room, "logging user room id");
  //   if (users[0] && users.length > 0) {
  //     Actions.Chat({
  //       title: users[0].username,
  //       roomId: users[0].identifier + "_" + this.props.user.entity_id,
  //       guest: users[0]
  //       // roomId: chatList.data[index].room,
  //       // avatar: users[0].profile_image
  //     });
  //   }
  // };

  onMsgClicked = index => {
    const { chatList } = this.props;

    const guests =
      chatList.data && chatList.data.length > 0
        ? chatList.data[index].partner
        : {};

    if (guests && guests.length > 0) {
      Actions.Chat({
        title: guests[0].username,
        guest: guests[0]
      });
    }
  };

  _fetchingUser() {
    const { user } = this.props;
    const { data } = this.props.chatHistory;
    console.log("hello user", user.data);
    const length = data.length - 1;
    // const message = data[length];
    // const lastMessageId = message._id;
    // this._fetchMessages(lastMessageId);
  }

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

  _getChatDetail(chatItem, chatIndex) {
    console.log("you are focussing on :", chatItem);
    console.log("here is chat indexer called :", chatIndex);
  }

  render() {
    const { chatList, user } = this.props;
    const data = this.props.chatHistory;
    console.log(data, "chat history data");

    // console.log("chatlist found :", chatList.data);
    const swipeoutBtns = [
      {
        component: (
          <ButtonView
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.quaternary
            }}
            onPress={() => null
            //   {
            //   // this.props.deleteChatLocally({ indexer });
            //   // this.props.requestDeleteChat({
            //   //   entity_id: items.entity_id
            //   // });
            // }
            }
          >
            <Image source={Images.del} />
          </ButtonView>
        )
      }
    ];
    return (
      // <Swipeout
      //   backgroundColor="#fff"
      //   onOpen={(sectionID, rowId, direction: "right") => {
      //     console.log(
      //       "logging section id : ",
      //       sectionID,
      //       " , row id : ",
      //       rowId + " , direction forcing to : ",
      //       direction
      //     );
      //   }}
      //   onClose={(sectionID, rowId, direction: "left") => {
      //     console.log(
      //       "logging section id : ",
      //       sectionID,
      //       " , row id : ",
      //       rowId + " , direction forcing to : ",
      //       direction
      //     );
      //   }}
      //   right={swipeoutBtns}
      // >

      //   <FlatList
      //   data={chatList.data}
      //   renderItem={(item, index) => {
      //     const items = item.item;
      //     let indexer = item.index;
      //     console.log("items", items);
      //     console.log("items index", item.index);
      //     let image = Images.profileplaceholder;
      //     if (
      //       items.partner &&
      //       items.partner.length > 0 &&
      //       items.partner[0].profile_image !== ""
      //     ) {
      //       image = { uri: items.partner[0].profile_image };
      //     }
      //     console.log(image, "image valued");
      //     return (
      //       <ButtonView
      //         onPress={() => {
      //           this.onMsgClicked(indexer);
      //         }}
      //         style={{
      //           paddingVertical: Metrics.baseMargin,
      //           justifyContent: "space-between",
      //           flexDirection: "row"
      //         }}
      //       >
      //         <View
      //           style={{
      //             alignItems: "flex-start",
      //             flex: 2
      //           }}
      //         >
      //           <Image
      //             source={image}
      //             style={{
      //               borderRadius: 2,
      //               width: Metrics.image.medium,
      //               height: Metrics.image.medium
      //             }}
      //           />
      //         </View>
      //         <View
      //           style={{
      //             alignItems: "flex-start",
      //             justifyContent: "flex-start",
      //             flex: 8
      //           }}
      //         >
      //           <Text size="large" color="tertiary" type="black">
      //             {items.partner && items.partner.length > 0
      //               ? items.partner[0].username
      //               : ""}{" "}
      //           </Text>
      //           <Text size="small" color="quaternary" type="black">
      //             {items.message}
      //           </Text>
      //         </View>
      //       </ButtonView>
      //     );
      //   }}
      //   onRefresh={() => this.fetchInbox()}
      //   refreshing={chatList.isFetching}
      // />
      <View style={styles.container}>
        <Text>data</Text>
        <ImageButton
          onPress={this.onAddChatItem}
          source={Images.addPostBtn}
          style={styles.addChatButton}
        />
      </View>
      // </Swipeout>
    );
  }
}

const mapStateToProps = store => ({
  chatHistory: store.chatHistory,

  user: store.user,
  // chatList: store.chatList,

  networkInfo: store.networkInfo
});

const actions = {
  request
  // requestDeleteChat,
  // deleteChatLocally
};

export default connect(mapStateToProps, actions)(Inbox);
