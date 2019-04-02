import types from './types';
import { get, getQueryParams, post, put, remove } from '../../../utils/request';

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

function editProduct(id, data) {
  return {
    type: types.EDIT_PRODUCT,
    promise: put(`products/${id}`, data),
  };
}

function clearProductsStatus() {
  return {
    type: types.CLEAR_PRODUCTS_STATUS,
  };
}

function createProduct(data) {
  return {
    type: types.CREATE_PRODUCT,
    promise: post(`products`, data),
  };
}

function editProductStatus(id, status) {
  return {
    type: types.EDIT_PRODUCT_STATUS,
    promise: put(`products/${id}/status`, status),
  };
}

function removeProduct(id) {
  return {
    type: types.REMOVE_PRODUCT,
    promise: remove(`products/${id}`),
  };
}

function findProduct(id) {
  return {
    type: types.FIND_PRODUCT,
    promise: get(`products/${id}`),
  };
}

export default {
  listProducts,
  editProduct,
  listProductsStatus,
  clearProductsStatus,
  createProduct,
  editProductStatus,
  removeProduct,
  findProduct,
};
