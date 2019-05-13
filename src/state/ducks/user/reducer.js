import { handle } from 'redux-pack';
import types from './types';
import utils from './utils';

const initialState = {
  isLoading: false,
  error: null,
  data: utils.getLocalStorageUsers(),
  verifyIsLoading: false,
  verifyError: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERS:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          verifyIsLoading: true,
          verifyError: null,
        }),
        failure: (prevState) => ({ ...prevState, verifyError: payload }),
        success: (prevState) => ({
          ...prevState,
        }),
        finish: (prevState) => ({ ...prevState, verifyIsLoading: false }),
      });
    default:
      return state;
  }
}

export default userReducer;
