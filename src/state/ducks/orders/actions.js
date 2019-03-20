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

export default {
  listOrders,
  findOrder,
};
