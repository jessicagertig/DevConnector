//a reducer takes in state and an action
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  //desconstruct action.type and action.payload
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      //since state is immutable we want to include any state that is already there(with spread operator) and then add our new alert
      return [...state, payload];
    case REMOVE_ALERT:
      //for REMOVE_ALERT the payload will only be the alert ID, we'll filter through alerts and return all except for the one matching the payload/ID
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
