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
function listProductsStatusReducer(state = listStatusInitialState, action) {
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

const createProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function createProductsReducer(state = createProductInitialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.CREATE_PRODUCT:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    default:
      return state;
  }
}

const editProductStatusInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function editProductStatusReducer(
  state = editProductStatusInitialState,
  action,
) {
  const { payload, type } = action;
  switch (type) {
    case types.EDIT_PRODUCT_STATUS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    default:
      return state;
  }
}

const removeProductInitialState = {
  error: null,
  isLoading: false,
};
function removeProductReducer(state = removeProductInitialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.REMOVE_PRODUCT:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    default:
      return state;
  }
}

export default combineReducers({
  listProducts: listProductsReducer,
  listStatus: listProductsStatusReducer,
  createProduct: createProductsReducer,
  editProductStatus: editProductStatusReducer,
  removeProduct: removeProductReducer,
});
