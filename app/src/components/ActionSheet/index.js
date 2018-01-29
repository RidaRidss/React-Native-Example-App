// @flow
import React from "react";
import PropTypes from "prop-types";
import ActionSheetRN from "react-native-actionsheet";

export default class ActionSheet extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    cancelButtonIndex: PropTypes.number,
    destructiveButtonIndex: PropTypes.number,
    onPress: PropTypes.func
  };

  static defaultProps = {
    cancelButtonIndex: 0,
    destructiveButtonIndex: undefined,
    onPress: () => {}
  };

  show() {
    this.actionSheet.show();
  }

  render() {
    const {
      title,
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
      onPress
    } = this.props;

    return (
      <ActionSheetRN
        ref={ref => {
          this.actionSheet = ref;
        }}
        title={title}
        options={options}
        cancelButtonIndex={cancelButtonIndex}
        destructiveButtonIndex={destructiveButtonIndex}
        onPress={onPress}
      />
    );
  }
}
