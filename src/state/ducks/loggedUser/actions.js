import types from './types';
import { patch } from '../../../utils/request';

function updateUserPassword(data) {
  return {
    type: types.UPDATE_PASSWORD,
    promise: patch(`users/password`, data),
  };
}

function changeUserPasswordLoggedIn(data) {
  return {
    type: types.CHANGE_USER_PASSWORD_LOGGED_IN,
    promise: patch(`users/me/password`, data),
  };
}

export default {
  updateUserPassword,
  changeUserPasswordLoggedIn,
};
