import confirmationReducer from './confirmationReducer';
import messageReducer from './messageReducer';

export const rootReducer = ({ confirmationState, messageState }, action) => {
    return {
        confirmationState: confirmationReducer(confirmationState, action),
        messageState: messageReducer(messageState, action)
    }
};