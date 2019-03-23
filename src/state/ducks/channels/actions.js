import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listChannels(params) {
  return {
    type: types.LIST_CHANNELS,
    promise: get(`channels${getQueryParams(params)}`),
  };
}

export default {
  listChannels,
};
