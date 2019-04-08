import types from './types';

import { get, patch, getQueryParams } from '../../../utils/request';

function listNotifications(params) {
  return {
    type: types.LIST_NOTIFICATIONS,
    promise: get(`notifications${getQueryParams(params)}`),
  };
}

function clearNotifications() {
  return {
    type: types.CLEAR_NOTIFICATIONS,
  };
}

function viewNotification() {
  return {
    type: types.VIEW_NOTIFICATION,
    promise: patch(`viewedin`),
  };
}

export default {
  listNotifications,
  clearNotifications,
  viewNotification,
};
