import { showConfirmation, hideConfirmation } from './confirmationType';

export const showConfirmationAction = payload => ({
  type: showConfirmation,
  payload
});

export const hideConfirmationAction = () => ({
  type: hideConfirmation
});