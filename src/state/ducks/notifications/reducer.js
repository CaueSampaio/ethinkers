import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const listNotificationInitialState = {
  isLoading: false,
  error: null,
  data: [],
};

function listReducer(state = listNotificationInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_NOTIFICATIONS:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_NOTIFICATIONS:
      return listNotificationInitialState;
    default:
      return state;
  }
}

const viewNotificationInitialState = {
  isLoading: false,
  error: null,
  data: null,
};

function viewReducer(state = viewNotificationInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.VIEW_NOTIFICATION:
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
  list: listReducer,
  view: viewReducer,
});
