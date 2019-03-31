import types from './types';
import { post } from '../../../utils/request';

function createSku(data) {
  return {
    type: types.CREATE_SKU,
    promise: post(`/skus`, data),
  };
}

export default {
  createSku,
};
