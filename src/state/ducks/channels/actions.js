import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listChannels(params) {
  return {
    type: types.LIST_CHANNELS,
    promise: get(`channels${getQueryParams(params)}`),
  };
}

function clearChannels() {
  return {
    type: types.CLEAR_CHANNELS,
  };
}

function listChannelsStatus() {
  return {
    type: types.LIST_CHANNELS_STATUS,
    promise: get(`channels/status`),
  };
}

function clearChannelsStatus() {
  return {
    type: types.CLEAR_CHANNELS_STATUS,
  };
}

export default {
  listChannels,
  clearChannels,

  listChannelsStatus,
  clearChannelsStatus,
};
