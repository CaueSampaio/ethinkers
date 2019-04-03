import types from './types';
import { patch } from '../../../utils/request';

function updateUserPassword(data) {
  return {
    type: types.UPDATE_PASSWORD,
    promise: patch(`users/password`, data),
  };
}

export default {
  updateUserPassword,
};
