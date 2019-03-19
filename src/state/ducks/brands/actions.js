import types from './types';
import { get } from '../../../utils/request';

function listBrands() {
  return {
    type: types.LIST_BRANDS,
    promise: get(`brands`),
  };
}

export default {
  listBrands,
};
