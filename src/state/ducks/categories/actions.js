import types from './types';
import { get } from '../../../utils/request';

function listCategories() {
  return {
    type: types.LIST_CATEGORIES,
    promise: get(`categories`),
  };
}

function clearCategories() {
  return {
    type: types.CLEAR_CATEGORIES,
  };
}

export default {
  listCategories,
  clearCategories,
};
