import { connect } from "react-redux";
import React, { Component } from "react";
import _ from "lodash";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
// import {  } from "react-native-material-textfield";
import PropTypes from "prop-types";

import styles from "./styles";
import { Metrics, Colors, Fonts, Images } from "../../theme";
import { FlatList, ImageButton, Text } from "../../components";
import {
  CHAT_API_GET_THREAD,
  APP_TOKEN
} from "../../services/SocketIO/constants";
import SocketIO from "../../services/SocketIO";
import { request } from "../../actions/ChatListActions";

class Inbox extends Component {
  static propTypes = {
    data: PropTypes.array,
    user: PropTypes.object.isRequired
  };

  static defaultProps = {};
  constructor(props) {
    super(props);
    this._fetchingUser();
  }

  componentDidMount() {
    this._fetchingUser();
    this.fetchInbox();
  }

  fetchInbox = () => {
    const { user } = this.props;
    console.log(this.props.user.data.entity_auth_id);
    const payload = {
      token: "h9p2rbry7cykgos15i7b189s2",
      identifier: this.props.user.data.entity_auth_id
    };
    this.props.request(CHAT_API_GET_THREAD, payload);
  };

  onAddChatItem = () => {
    return null;
  };

  onMsgClicked = index => {
    const { chatList } = this.props;

    const guests =
      chatList.data && chatList.data.length > 0
        ? chatList.data[index].partner
        : {};

    if (guests && guests.length > 0) {
      Actions.chat({
        title: guests[0].username,
        guest: guests[0]
      });
    }
  };

  _fetchingUser() {
    const { user } = this.props;
    console.log("hello user", user);
  }

  render() {
    const { chatList, user } = this.props;
    console.log("chatlist found :", chatList.data);
    return (
      <View style={styles.container}>
        <FlatList
          data={chatList.data}
          renderItem={(item, index) => {
            const items = item.item;
            console.log("testing item", item.item);
            console.log("testing item index", item.index);
            let image = Images.profileplaceholder;
            if (
              items.partner &&
              items.partner.length > 0 &&
              items.partner[0].profile_image !== ""
            ) {
              image = { uri: items.partner[0].profile_image };
            }
            console.log(image, "image valued");
            return (
              <View
                style={{
                  paddingVertical: Metrics.baseMargin,
                  justifyContent: "space-between",
                  flexDirection: "row"
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    flex: 2
                  }}
                >
                  <Image
                    source={image}
                    style={{
                      borderRadius: 2,
                      width: Metrics.image.medium,
                      height: Metrics.image.medium
                    }}
                  />
                </View>
                <View
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flex: 8
                  }}
                >
                  <Text size="large" color="tertiary" type="black">
                    {items.partner && items.partner.length > 0
                      ? items.partner[0].username
                      : ""}
                  </Text>
                  <Text size="small" color="quaternary" type="black">
                    {items.message}
                  </Text>
                </View>
              </View>
            );
          }}
          onRefresh={() => this.fetchInbox()}
          refreshing={chatList.isFetching}
        />
        <ImageButton
          onPress={this.onAddChatItem}
          source={Images.addPostBtn}
          style={styles.addChatButton}
        />
      </View>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user,
  chatList: store.chatList,
  networkInfo: store.networkInfo
});

const actions = {
  request
};

export default connect(mapStateToProps, actions)(Inbox);
