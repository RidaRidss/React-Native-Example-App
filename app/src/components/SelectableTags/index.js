import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView, TouchableOpacity } from "react-native";

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
  tagBackgroundColor: "white",
  tagChangeNotifierCallback: undefined
};

Tag.propTypes = {
  index: PropTypes.number,
  onTagPress: PropTypes.func,
  tagColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  tagBackgroundColor: PropTypes.string,
  tagChangeNotifierCallback: PropTypes.func
};

class Tags extends React.PureComponent {
  state = {
    selectedTags: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTagsIndex && nextProps.selectedTagsIndex.length) {
      this.setState({
        selectedTags: nextProps.selectedTagsIndex
      });
    }
  }

  _collectSelectedTagsIndex = index => {
    const tempTags = this.state.selectedTags;
    let matchFound = false;
    let foundIndex = undefined;
    for (let i = 0; i < this.state.selectedTags.length; i++) {
      if (index === this.state.selectedTags[i]) {
        matchFound = true;
        foundIndex = i;
        break;
      }
    }

    if (matchFound) {
      tempTags.splice(foundIndex, 1);
      this.setState({
        selectedTags: tempTags
      });
    } else {
      tempTags.push(index);
      this.setState({
        selectedTags: tempTags
      });
    }
    this.forceUpdate();

    if (this.props.tagChangeNotifierCallback)
      this.props.tagChangeNotifierCallback(tempTags.length);
  };

  render() {
    const { initialTags } = this.props;
    return (
      <ScrollView horizontal contentContainerStyle={styles.container}>
        {this.props.initialTags.map((tag, i) => {
          let isSelected = false;
          for (let j = 0; j < this.state.selectedTags.length; j++) {
            if (this.state.selectedTags[j] === i) isSelected = true;
          }
          return (
            <Tag
              index={i}
              label={tag}
              key={`tag_${i}`}
              onTagPress={this._collectSelectedTagsIndex}
              tagColor={isSelected ? "white" : "black"}
              tagBackgroundColor={isSelected ? "black" : "white"}
            />
          );
        })}
      </ScrollView>
    );
  }

  getSelectedTags() {
    return this.state.selectedTags;
  }
}

Tags.defaultProps = {};
Tags.propTypes = {
  initialTags: PropTypes.array,
  selectedTagsIndex: PropTypes.array
};

export { Tag };
export default Tags;
