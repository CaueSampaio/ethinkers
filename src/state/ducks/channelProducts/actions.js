import types from './types';
import { get, getQueryParams, remove } from '../../../utils/request';

function listChannelProducts(params) {
  return {
    type: types.LIST_CHANNEL_PRODUCTS,
    promise: get(`channelproducts${getQueryParams(params)}`),
  };
}

function findChannelProduct(id) {
  return {
    type: types.FIND_CHANNEL_PRODUCT,
    promise: get(`channelproducts/${id}`),
  };
}

function removeChannelProduct(id) {
  return {
    type: types.REMOVE_CHANNEL_PRODUCT,
    promise: remove(`channelproducts/${id}`),
  };
}

function listChannelProductsSummary() {
  return {
    type: types.LIST_CHANNEL_PRODUCTS_SUMMARY,
    promise: get(`channelproducts/summary`),
  };
}

export default {
  listChannelProducts,
  findChannelProduct,
  removeChannelProduct,
  listChannelProductsSummary,
};
