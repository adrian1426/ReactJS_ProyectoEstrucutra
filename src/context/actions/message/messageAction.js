import { showMessage, hideMessage } from './messageType';

export const showMessageAction = payload => ({
  type: showMessage,
  payload
});

export const hideMessageAction = () => ({
  type: hideMessage
});