import { handle } from 'redux-pack';
import types from './types';
import utils from './utils';

const initialState = {
  isLoading: false,
  error: null,
  data: utils.getLocalStorageUser(),
};

/**
 * Auth Reducer
 *
 * @param {Object} state Current state  of the reducer, Defaults to the initialState
 * @param {Object} action Action that has been dispatched.
 */
function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.HANDLE_LOGIN:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, data: null, error: payload }),
        success: (prevState) => ({
          ...prevState,
          data: utils.getUserData(payload.token),
        }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
      });
    default:
      return state;
  }
}

export default authReducer;
