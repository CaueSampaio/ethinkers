import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const listInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listCategoriesReducer(state = listInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.LIST_CATEGORIES:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_CATEGORIES:
      return listInitialState;
    default:
      return state;
  }
}

export default combineReducers({
  listCategories: listCategoriesReducer,
});
