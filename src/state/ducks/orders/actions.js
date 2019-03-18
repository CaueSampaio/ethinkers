import types from './types';
import { get } from '../../../utils/request';

function listOrders() {
  return {
    type: types.LIST_ORDERS,
    promise: get('/orders'),
  };
}

export default {
  listOrders,
};
