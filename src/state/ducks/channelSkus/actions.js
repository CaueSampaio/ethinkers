import types from './types';
import { put } from '../../../utils/request';

function editChannelSkus(id, data) {
  return {
    type: types.EDIT_CHANNEL_SKU,
    promise: put(`channelSkus/${id}`, data),
  };
}

export default {
  editChannelSkus,
};
