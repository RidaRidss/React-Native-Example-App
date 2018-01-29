// @flow
import _ from "lodash";
import React from "react";
import { View, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import Util from "../../util";
import { Text, ButtonView } from "../../components";
import { Images } from "../../theme";
import styles from "./styles";

export default class LikeCommentShareMore extends React.Component {
  // state = {
  //   likes: this.props.likes,
  //   is_like: this.props.is_like
  // };

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return !_.isEqual(nextProps, this.props);
  }

  render() {
    const {
      is_like,
      likes,
      gallery,
      entity_id,
      going,
      discussion,
      onMorePress,
      onLikePressed,
      eventDetails,
      eventTitle,
      categories
    } = this.props;

    // TODO: FIX THISS ZAIN Add Numerals lib
    let zero = Number("0");

    return (
      <View style={styles.container}>
        <View style={styles.likeCommentShareLeftView}>
          <ButtonView
            activeOpacity={1}
            onPress={() => {
              if (is_like === false) {
                onLikePressed(entity_id, is_like ? 0 : 1);
                this.setState({
                  likes: likes + 1,
                  is_like: !is_like
                });
              } else {
                onLikePressed(entity_id, is_like ? 0 : 1);
                this.setState({
                  likes: likes - 1,
                  is_like: !is_like
                });
              }
            }}
            style={styles.rippleContainer}
          >
            <Image
              source={is_like ? Images.likeSelected : Images.like}
              style={styles.socialIcon}
            />
            <Text style={styles.text} size="small" type="medium">
              {likes === 0 ? "0" : likes}
            </Text>
          </ButtonView>
          <ButtonView
            activeOpacity={1}
            onPress={() => Actions.going({ entity_id: this.props.entity_id })}
            style={styles.rippleContainer}
          >
            <Image source={Images.users} style={styles.socialIcon} />
            <Text size="small" type="medium" style={styles.text}>
              {going === 0 ? "0" : going}
            </Text>
          </ButtonView>
          <ButtonView
            activeOpacity={1}
            onPress={() =>
              Actions.comments({
                gallery: gallery,
                event_id: entity_id,
                eventTitle,
                categories
              })}
            style={styles.rippleContainer}
          >
            <Image source={Images.comments} style={styles.socialIcon} />
            <Text style={styles.text} size="small" type="medium">
              {discussion === 0 ? "0" : discussion}
            </Text>
          </ButtonView>
          <ButtonView
            activeOpacity={1}
            onPress={() => Util.onShare("title", eventDetails)}
            style={styles.rippleContainer}
          >
            <Image source={Images.share} style={styles.socialIcon} />
          </ButtonView>
        </View>
        {onMorePress && (
          <ButtonView
            onPress={onMorePress}
            style={styles.likeCommentShareRightView}
          >
            <Image source={Images.more} />
          </ButtonView>
        )}
      </View>
    );
  }
}
