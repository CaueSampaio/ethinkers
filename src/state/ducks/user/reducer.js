import { handle } from 'redux-pack';
import types from './types';
import utils from './utils';

const initialState = {
  isLoading: false,
  error: null,
  data: utils.getLocalStorageUser(),
  verifyIsLoading: false,
  verifyError: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.HANDLE_LOGIN:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          verifyIsLoading: true,
          verifyError: null,
        }),
        failure: (prevState) => ({ ...prevState, verifyError: payload }),
        success: (prevState) => ({
          ...prevState,
          data: utils.getUserData(payload.token),
        }),
        finish: (prevState) => ({ ...prevState, verifyIsLoading: false }),
      });
    case types.HANDLE_LOGOUT:
      return {
        ...state,
        data: null,
      };
    case types.FORGOT_PASSORD:
      return handle(state, action, {
        start: (prevState) => ({
          ...prevState,
          verifyIsLoading: true,
          verifyError: null,
        }),
        failure: (prevState) => ({ ...prevState, verifyError: payload }),
        success: (prevState) => ({
          ...prevState,
          data: utils.getUserData(payload.token),
        }),
        finish: (prevState) => ({ ...prevState, verifyIsLoading: false }),
      });
    default:
      return state;
  }
}

export default userReducer;
