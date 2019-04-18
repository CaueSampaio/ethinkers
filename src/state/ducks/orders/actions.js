import types from './types';
import { get, getQueryParams, post, put } from '../../../utils/request';

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

function invoiceOrder(data) {
  return {
    type: types.INVOICE_ORDER,
    promise: post(`/orderinvoices`, data),
  };
}

function cancelOrder(id, data) {
  return {
    type: types.CANCEL_ORDER,
    promise: put(`/orders/${id}/status`, data),
  };
}

function cancelOrderItems(id, data) {
  return {
    type: types.CANCEL_ORDER_ITEMS,
    promise: put(`/orderitems/${id}/status`, data),
  };
}

function trackSkus(id, data) {
  return {
    type: types.TRACK_SKUS,
    promise: put(`/orderinvoices/${id}`, data),
  };
}

function exportOrders() {
  return {
    type: types.EXPORT_ORDERS,
    promise: get(`/orders/export`),
  };
}

export default {
  listOrders,
  findOrder,

  listOrderStatus,
  invoiceOrder,
  cancelOrder,
  cancelOrderItems,
  trackSkus,

  exportOrders,
};
