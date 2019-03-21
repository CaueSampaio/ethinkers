import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listBrands(params) {
  return {
    type: types.LIST_BRANDS,
    promise: get(`brands${getQueryParams(params)}`),
  };
}

export default {
  listBrands,
};
