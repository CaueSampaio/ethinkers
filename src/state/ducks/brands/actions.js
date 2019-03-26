import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listBrands(params) {
  return {
    type: types.LIST_BRANDS,
    promise: get(`brands${getQueryParams(params)}`),
  };
}

function clearBrands() {
  return {
    type: types.CLEAR_BRANDS,
  };
}

export default {
  listBrands,
  clearBrands,
};
