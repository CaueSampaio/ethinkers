import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listChannelProducts(params) {
  return {
    type: types.LIST_CHANNEL_PRODUCTS,
    promise: get(`channelproducts${getQueryParams(params)}`),
  };
}

export default {
  listChannelProducts,
};
