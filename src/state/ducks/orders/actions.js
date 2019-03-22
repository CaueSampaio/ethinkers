import types from './types';
import { get, getQueryParams } from '../../../utils/request';

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

export default {
  listOrders,
  findOrder,

  listOrderStatus,
};
