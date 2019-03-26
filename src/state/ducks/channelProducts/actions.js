import types from './types';
import { get, getQueryParams, remove, put } from '../../../utils/request';

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

function enableOrDisableChannelProduct(id) {
  // TODO: validar se precisa passar o status do produto como query param
  return {
    type: types.ENABLE_OR_DISABLE_CHANNEL_PRODUCT,
    promise: put(`channelproducts/${id}/status`),
  };
}

export default {
  listChannelProducts,
  findChannelProduct,
  removeChannelProduct,
  listChannelProductsSummary,
  enableOrDisableChannelProduct,
};
