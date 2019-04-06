import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listCompanies(idCompany, params) {
  return {
    type: types.LIST_COMPANIES,
    promise: get(`${idCompany}/sellers${getQueryParams(params)}`),
  };
}

function clearCompanies() {
  return {
    type: types.CLEAR_COMPANIES,
  };
}

export default { listCompanies, clearCompanies };
