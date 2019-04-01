import types from './types';
import { get, getQueryParams, post } from '../../../utils/request';

function listOrders(data) {
  return {
    type: types.LIST_ORDERS,
    promise: get(`/orders${getQueryParams(data)}`),
  };
}

function findOrder(id) {
  return {
    type: types.FIND_ORDER,
    promise: get(`/orders/${id}`),
  };
}

function listOrderStatus() {
  return {
    type: types.LIST_ORDER_STATUS,
    promise: get(`/orders/status`),
  };
}

function invoiceOrderProductsSKU(data) {
  return {
    type: types.INVOICE_ORDER_PRODUCTS_SKUS,
    promise: post(`orderinvoices`, data),
  };
}

export default {
  listOrders,
  findOrder,

  listOrderStatus,
  invoiceOrderProductsSKU,
};
