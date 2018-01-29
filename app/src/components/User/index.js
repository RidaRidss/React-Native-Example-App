// @flow
import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
import { Text } from "../";
import Utils from "../../util";
import styles from "./styles";
import { Metrics } from "../../theme/index";

export default class Item extends Component {
  render() {
    const { attributes, gallery, count } = this.props.user.events;
    const userImage = Utils.getUserProfile(count.platform_id);
    const { start_date, end_date } = attributes;
    let time = "";
    try {
      time = Utils.getDateFrom(attributes.start_date);
    } catch (err) {
      console.warn(err.message);
    }

    let eventTime = "Created ";
    if (Utils.isDatePast(end_date)) {
      eventTime = "Ended ";
    } else if (Utils.isDatePast(start_date) && !Utils.isDatePast(end_date)) {
      eventTime = "Started ";
    }

    return (
      <View style={styles.container}>
        <Image source={{ uri: userImage }} style={styles.profile} /> 
            <View style={styles.addressDetail}>
            <Text
              color="secondary"
              type="medium"
              textAlign="left"
              numberOfLines={1}
              style={[
                // styles.marginLeft,
                // Platform.OS === "ios" ? { lineHeight:  } : 0
              ]}
            >
              {attributes.user_name}
            </Text>
            <Text size="small"
             textAlign="left" 
             style={[
           
              Platform.OS === "ios" ? { marginTop:-Metrics.smallMargin / 1.5 } : 0
            ]}
             numberOfLines={1}
             >
             {eventTime}{time}, {" "}
              {attributes.location}
     
            </Text>
            </View>
      </View>
     
    );
  }
}



// <View style={styles.detail}>
// <Text
//   color="secondary"
//   type="medium"
//   textAlign="left"
//   numberOfLines={1}
//   style={[
//     styles.marginTop,
//     // Platform.OS === "ios" ? { lineHeight: 18 } : 0
//   ]}
// >
//   {attributes.user_name}
// </Text>
// <Text size="small" textAlign="left" numberOfLines={1}>
//   {eventTime},{time},
//   {", "},
//   {attributes.location}
// </Text>
// </View>