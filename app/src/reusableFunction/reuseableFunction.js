import { MessageBarManager } from "react-native-message-bar";
import { ApplicationStyles, Colors } from "../theme";

// function to show message bar.
const showAlert = (title, message) => {
  MessageBarManager.showAlert({
    titleStyle: { ...ApplicationStyles.messageBarTitle },
    messageStyle: { ...ApplicationStyles.messageBarDescription },
    titleNumberOfLines: 1,
    messageNumberOfLines: 2,
    title,
    message,
    alertType: "error",
    stylesheetError: {
      backgroundColor: Colors.tertiary,
      strokeColor: "white",
      color:"white"
    }
  });
};

export default {
  showAlert
};
