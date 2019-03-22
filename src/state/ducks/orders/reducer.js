import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const listOrdersInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function listOrdersReducer(state = listOrdersInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LIST_ORDERS:
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

const findOrderInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function findOrderReducer(state = findOrderInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.FIND_ORDER:
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

const listOrderStatusInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listOrderStatusReducer(state = listOrderStatusInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_ORDER_STATUS:
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
  listOrders: listOrdersReducer,
  findOrder: findOrderReducer,
  listStatus: listOrderStatusReducer,
});
