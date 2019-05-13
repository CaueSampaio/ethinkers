import types from './types';
import { get } from '../../../utils/request';
import utils from './utils';

function getUsers() {
  return {
    type: types.GET_USERS,
    promise: get(`/users`),
    meta: {
      onSuccess: (response) => utils.setLocalStorageUsers(response),
    },
  };
}

export default {
  getUsers,
};
