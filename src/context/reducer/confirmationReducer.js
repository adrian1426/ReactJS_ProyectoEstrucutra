import { showConfirmation, hideConfirmation } from '../actions/confirmation/confirmationType';

const confirmationReducer = (state, action) => {
  switch (action.type) {
    case showConfirmation:
      return {
        ...action.payload
      };
    case hideConfirmation: {
      return {
        ...state,
        open: false,
        infoOnly: false
      };
    }
    default:
      return state;
  }
};

export default confirmationReducer;