import React from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity } from "react-native";

import { Text } from "../";
import styles from "./styles";
import { Fonts, Metrics } from "../../theme";

const Tag = ({ label, onTagPress, index, tagBackgroundColor, tagColor }) => (
  <TouchableOpacity
    style={[
      styles.tag,
      {
        borderColor: "black",
        borderWidth: 2,
        marginLeft: Metrics.ratio(index === 0 ? 0 : 8),
        backgroundColor: tagBackgroundColor
      }
    ]}
    activeOpacity={onTagPress ? 0.7 : 1}
    onPress={() => onTagPress && onTagPress(index, label)}
  >
    <Text
      style={{
        color: tagColor,
        fontSize: Metrics.ratio(12),
        fontFamily: Fonts.type.medium
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

Tag.defaultProps = {
  index: 0,
  onTagPress: undefined,
  tagColor: "black",
  tagBackgroundColor: "white"
};

Tag.propTypes = {
  index: PropTypes.number,
  onTagPress: PropTypes.func,
  tagColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  tagBackgroundColor: PropTypes.string
};

class Tags extends React.PureComponent {
  render() {
    const { initialTags, selectedTagsStyles, onTagPress } = this.props;
    return (
      <View style={styles.container}>
        {this.props.initialTags.map((tag, i) => (
          <Tag
            index={i}
            label={tag}
            key={`tag_${i}`}
            onTagPress={onTagPress}
            tagColor={
              (selectedTagsStyles[i] && selectedTagsStyles[i].tagColor) ||
              "white"
            }
            tagBackgroundColor={
              (selectedTagsStyles[i] &&
                selectedTagsStyles[i].tagBackgroundColor) ||
              "black"
            }
          />
        ))}
      </View>
    );
  }
}

Tags.defaultProps = {
  onTagPress: undefined
};
Tags.propTypes = {
  onTagPress: PropTypes.func,
  initialTags: PropTypes.array.isRequired,
  selectedTagsStyles: PropTypes.array.isRequired
};

export { Tag };
export default Tags;
