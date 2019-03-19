import types from './types';
import { get } from '../../../utils/request';

function listCategories() {
  return {
    type: types.LIST_CATEGORIES,
    promise: get(`categories`),
  };
}

export default {
  listCategories,
};
