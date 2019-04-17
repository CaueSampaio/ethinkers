import types from './types';
import {
  get,
  getQueryParams,
  patch,
  remove,
  put,
  post,
} from '../../../utils/request';

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

function editChannelProductStatus(id, data) {
  return {
    type: types.ENABLE_OR_DISABLE_CHANNEL_PRODUCT,
    promise: patch(`channelproducts/${id}/status`, data),
  };
}

function editChannelProduct(id, data) {
  return {
    type: types.EDIT_CHANNEL_PRODUCT,
    promise: put(`channelproducts/${id}`, data),
  };
}

function synchronizeChannelProduct(data) {
  return {
    type: types.SYNCHRONIZE_CHANNEL_PRODUCT,
    promise: put(`channelproducts/status`, data),
  };
}

function createChannelProduct(data) {
  return {
    type: types.CREATE_CHANNEL_PRODUCT,
    promise: post(`channelproducts`, data),
  };
}

function listUpdateStatus() {
  return {
    type: types.LIST_UPDATE_STATUS,
    promise: get(`channelproducts/updatestatus`),
  };
}

function clearUpdateStatus() {
  return {
    type: types.CLEAR_UPDATE_STATUS,
  };
}

function selectProduct(data) {
  return {
    type: types.SELECT_PRODUCTS,
    data,
  };
}

function clearSelectedProducts() {
  return {
    type: types.CLEAR_SELECTED_PRODUCTS,
  };
}

function listChannelProductsStatus(data) {
  return {
    type: types.LIST_CHANNEL_PRODUCT_STATUS,
    promise: get(`channelproducts/status${getQueryParams(data)}`),
  };
}

function clearProductStatus() {
  return {
    type: types.CLEAR_STATUS,
  };
}

export default {
  listChannelProducts,
  findChannelProduct,
  removeChannelProduct,
  listChannelProductsSummary,
  editChannelProductStatus,
  editChannelProduct,
  synchronizeChannelProduct,
  createChannelProduct,
  listUpdateStatus,
  clearUpdateStatus,
  selectProduct,
  listChannelProductsStatus,
  clearProductStatus,
  clearSelectedProducts,
};
