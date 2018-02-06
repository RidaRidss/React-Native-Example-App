// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Image, ViewPropTypes } from "react-native";

import styles from "./styles";
import { ButtonView } from "../";
import { Metrics } from "../../theme";

export default class ImageButton extends React.PureComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    onPress: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired
  };

  static defaultProps = {
    style: {},
    onPress: () => {}
  };

  render() {
    const { source, onPress, style, ...rest } = this.props;
    if (!Array.isArray(source)) {
      return (
        <ButtonView
          {...rest}
          style={[
            style,
            {
              padding: Metrics.smallMargin
            }
          ]}
          onPress={Array.isArray(onPress) ? onPress[0] : onPress}
        >
          <Image source={source} />
        </ButtonView>
      );
    }

    return (
      <View style={styles.container}>
        {source.map((item, index) => (
          <ButtonView
            {...rest}
            style={[
              style,
              {
                padding: Metrics.smallMargin
              }
            ]}
            key={`button_${index}`} // eslint-disable-line react/no-array-index-key
            onPress={
              Array.isArray(onPress) ? onPress[index] || (() => {}) : onPress
            }
          >
            <Image source={source[index]} />
          </ButtonView>
        ))}
      </View>
    );
  }
}
