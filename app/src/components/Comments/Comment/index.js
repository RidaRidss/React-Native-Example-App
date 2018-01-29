// @flow
import _ from "lodash";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, View, ActivityIndicator } from "react-native";
import Lightbox from "react-native-lightbox";

import styles from "./styles";
import { Images, Metrics } from "../../../theme";
import { Text } from "../../../components";
import Utils from "../../../util";

export default class Comment extends Component {
  static propTypes = {
    onLikePress: PropTypes.func,
    index: PropTypes.number,
    item: PropTypes.object.isRequired
  };

  static defaultProps = {
    index: undefined,
    onLikePress: () => {}
  };

  state = {
    like: this.props.item.like || "",
    is_like: this.props.item.is_like || false
  };

  shouldComponentUpdate(nextProps: Object, nextState: Object) {
    return (
      !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state)
    );
  }

  onLikePress(is_like: boolean, like: number) {
    this.setState({
      // eslint-disable-next-line no-nested-ternary
      like: like === "" ? 1 : is_like ? like - 1 : like + 1,
      is_like: !is_like
    });

    if (this.props.onLikePress) {
      const { index, item } = this.props;
      this.props.onLikePress(!is_like, index, item);
    }
  }

  render() {
    const { item } = this.props;
    const {
      comment,
      attachment,
      created_at,
      actor_name,
      actor_platform_id,
      is_loading
    } = item;

    const { like, is_like } = this.state;

    const source = actor_platform_id
      ? {
          uri: `http://graph.facebook.com/${actor_platform_id}/picture?type=large`
        }
      : Images.avatar;

    let time = "";
    try {
      time = Utils.getDateFrom(created_at);
    } catch (err) {
      console.warn(err.message);
    }

    return (
      <View style={styles.container}>
        <Image source={source} style={styles.avatar} />
        <View style={styles.comment}>
          {actor_name && (
            <Text color="secondary" textAlign="left" style={styles.margin}>
              {actor_name}
            </Text>
          )}
          {!_.isEmpty(comment) && (
            <Text
              type="bold"
              textAlign="left"
              color="secondary"
              style={styles.margin}
            >
              {comment || " "}
            </Text>
          )}
          {attachment && (
            <Lightbox
              activeProps={{
                style: {
                  flex: 1,
                  resizeMode: "contain"
                }
              }}
            >
              <Image source={{ uri: attachment }} style={styles.attachment} />
            </Lightbox>
          )}
          <View
            style={[
              styles.footer,
              // eslint-disable-next-line react-native/no-inline-styles
              { marginTop: attachment ? Metrics.smallMargin : 0 }
            ]}
          >
            <Text>{time}</Text>

            {is_loading && (
              <View style={styles.activityIndicator}>
                <ActivityIndicator />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
