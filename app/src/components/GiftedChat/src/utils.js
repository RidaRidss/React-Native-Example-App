import moment from "moment";

import { CHAT_DURATION } from "../../../constants";

const DEPRECATION_MESSAGE =
  "isSameUser and isSameDay should be imported from the utils module instead of using the props functions";

export function isSameDay(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }

  return currentCreatedAt.isSame(diffCreatedAt, "day");
}

export function isMessageInInterval(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.createdAt) {
    return false;
  }

  const currentCreatedAt = moment(currentMessage.createdAt);
  const diffCreatedAt = moment(diffMessage.createdAt);

  if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
    return false;
  }
  return currentCreatedAt.diff(diffCreatedAt, "seconds") <= CHAT_DURATION;
}

export function isSameUser(currentMessage = {}, diffMessage = {}) {
  return !!(
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  );
}

export function warnDeprecated(fn) {
  return (...args) => {
    console.warn(DEPRECATION_MESSAGE);
    return fn(...args);
  };
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
