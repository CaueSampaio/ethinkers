import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const listInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listChannelsReducer(state = listInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LIST_CHANNELS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_CHANNELS:
      return listInitialState;
    default:
      return state;
  }
}

const listStatusInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listChannelsStatusReducer(state = listStatusInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LIST_CHANNELS_STATUS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_CHANNELS_STATUS:
      return listStatusInitialState;
    default:
      return state;
  }
}

const listBrandsInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listBrandsStatusReducer(state = listBrandsInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LIST_CHANNEL_BRANDS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_CHANNEL_BRANDS:
      return listBrandsInitialState;
    default:
      return state;
  }
}

const listCategoriesInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listCategoriesStatusReducer(
  state = listCategoriesInitialState,
  action,
) {
  const { type, payload } = action;

  switch (type) {
    case types.LIST_CHANNEL_CATEGORIES:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_CHANNEL_CATEGORIES:
      return listBrandsInitialState;
    default:
      return state;
  }
}

export default combineReducers({
  listChannels: listChannelsReducer,
  listChannelsStatus: listChannelsStatusReducer,

  listBrands: listBrandsStatusReducer,
  listCategories: listCategoriesStatusReducer,
});
