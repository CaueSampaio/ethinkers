import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listCompanies(params) {
  return {
    type: types.LIST_COMPANIES,
    promise: get(`companies/sellers${getQueryParams(params)}`),
  };
}

function clearCompanies() {
  return {
    type: types.CLEAR_COMPANIES,
  };
}

export default { listCompanies, clearCompanies };
