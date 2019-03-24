import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listCategories(params) {
  return {
    type: types.LIST_CATEGORIES,
    promise: get(`categories${getQueryParams(params)}`),
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
