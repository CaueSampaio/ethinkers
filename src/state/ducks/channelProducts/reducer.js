import { combineReducers } from 'redux';
import { handle } from 'redux-pack';
import types from './types';

const listChannelProductsInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function listChannelProductsReducer(
  state = listChannelProductsInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_CHANNEL_PRODUCTS:
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

const findChannelProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function findChannelProductReducer(
  state = findChannelProductInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.FIND_CHANNEL_PRODUCT:
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

const removeChannelProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function removeChannelProductReducer(
  state = removeChannelProductInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.REMOVE_CHANNEL_PRODUCT:
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

const listChannelProductsSummaryInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listChannelProductsSummaryReducer(
  state = listChannelProductsSummaryInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_CHANNEL_PRODUCTS_SUMMARY:
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

const enableOrDisableChannelProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function enableOrDisableChannelProductReducer(
  state = enableOrDisableChannelProductInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.ENABLE_OR_DISABLE_CHANNEL_PRODUCT:
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
  listChannelProducts: listChannelProductsReducer,
  findChannelProduct: findChannelProductReducer,
  removeChannelProduct: removeChannelProductReducer,
  listSummary: listChannelProductsSummaryReducer,
  enableOrDisableProduct: enableOrDisableChannelProductReducer,
});
