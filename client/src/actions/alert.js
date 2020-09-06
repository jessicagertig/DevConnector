import { v4 as uuidv4 }from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

//need the thunk middleware in order to use dispatch in this way (basically bringing in the dispatch function)
export const setAlert = (msg, alertType) => dispatch => {
  //uuid package allows us to generate random ids
  const id = uuidv4();
  //dispatch is calling SET_ALERT
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
