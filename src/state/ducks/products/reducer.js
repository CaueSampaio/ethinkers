import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const listProductsInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function listProductsReducer(state = listProductsInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_PRODUCTS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_PRODUCTS:
      return listProductsInitialState;
    default:
      return state;
  }
}

const listStatusInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listProductsStatus(state = listStatusInitialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.LIST_PRODUCTS_STATUS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_PRODUCTS_STATUS:
      return listStatusInitialState;
    default:
      return state;
  }
}

export default combineReducers({
  listProducts: listProductsReducer,
  listStatus: listProductsStatus,
});
