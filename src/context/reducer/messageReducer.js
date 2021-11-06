import { showMessage, hideMessage } from '../actions/message/messageType';

const messageReducer = (state, action) => {
  switch (action.type) {
    case showMessage:
      return {
        ...action.payload
      };
    case hideMessage: {
      return {
        ...state,
        open: false
      };
    }
    default:
      return state;
  }
};

export default messageReducer;