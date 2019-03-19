import types from './types';
import { get } from '../../../utils/request';

function listChannels() {
  return {
    type: types.LIST_CHANNELS,
    promise: get(`channels`),
  };
}

export default {
  listChannels,
};
