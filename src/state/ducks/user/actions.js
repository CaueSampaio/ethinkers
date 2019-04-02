import types from './types';
import { post } from '../../../utils/request';
import utils from './utils';

function handleLogin(credentials) {
  return {
    type: types.HANDLE_LOGIN,
    promise: post(`users/auth`, credentials),
    meta: {
      onSuccess: (response) => utils.setLocalStorageUser(response),
    },
  };
}

function handleLogout() {
  return {
    type: types.HANDLE_LOGOUT,
  };
}

function verifyToken() {
  return {
    type: types.VERIFY_TOKEN,
    promise: post(`auth/refresh`),
    meta: {
      onSuccess: (response) => {
        utils.setLocalStorageUser(response);
      },
      onFailure: () => {
        utils.removeLocalStorageUser();
      },
    },
  };
}

export default {
  handleLogin,
  handleLogout,
  verifyToken,
};
