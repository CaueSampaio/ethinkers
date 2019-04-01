import types from './types';
import { post, put } from '../../../utils/request';

function createSku(data) {
  return {
    type: types.CREATE_SKU,
    promise: post(`/skus`, data),
  };
}

function editSku(id, data) {
  return {
    type: types.EDIT_SKU,
    promise: put(`skus/${id}`, data),
  };
}

export default {
  createSku,
  editSku,
};
