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

const editChannelProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function editChannelProductReducer(
  state = editChannelProductInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.EDIT_CHANNEL_PRODUCT:
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

const synchronizeChannelProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function synchronizeChannelProductReducer(
  state = synchronizeChannelProductInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.SYNCHRONIZE_CHANNEL_PRODUCT:
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

const createChannelProductInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function createChannelProductReducer(
  state = createChannelProductInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_CHANNEL_PRODUCT:
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

const listUpdateStatusInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listUpdateStatusReducer(state = listUpdateStatusInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_UPDATE_STATUS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_UPDATE_STATUS:
      return listUpdateStatusInitialState;
    default:
      return state;
  }
}

function selectProductReducer(state = [], action) {
  const { type, data } = action;

  switch (type) {
    case types.SELECT_PRODUCTS:
      return [...data];
    default:
      return state;
  }
}

const listStatusInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listStatusReducer(state = listStatusInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_CHANNEL_PRODUCT_STATUS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_STATUS:
      return state;
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
  editChannelProduct: editChannelProductReducer,
  synchronizeChannelProduct: synchronizeChannelProductReducer,
  createChannelProduct: createChannelProductReducer,
  listUpdateStatus: listUpdateStatusReducer,
  selectProduct: selectProductReducer,
  listStatus: listStatusReducer,
});
