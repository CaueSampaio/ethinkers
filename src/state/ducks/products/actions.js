import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listProducts(params) {
  return {
    type: types.LIST_PRODUCTS,
    promise: get(`products${getQueryParams(params)}`),
  };
}

function listProductsStatus() {
  return {
    type: types.LIST_PRODUCTS_STATUS,
    promise: get(`products/status`),
  };
}

function clearProductsStatus() {
  return {
    type: types.CLEAR_PRODUCTS_STATUS,
  };
}

export default {
  listProducts,
  listProductsStatus,
  clearProductsStatus,
};
