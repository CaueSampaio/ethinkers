import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listOrders(data) {
  return {
    type: types.LIST_ORDERS,
    promise: get(`/orders${getQueryParams(data)}`),
  };
}

export default {
  listOrders,
};
