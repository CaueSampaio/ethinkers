import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const createSkuInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function createSkuReducer(state = createSkuInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_SKU:
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

const editSkuInitialState = {
  error: null,
  isLoading: false,
  data: {},
};

function editSkuReducer(state = editSkuInitialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.EDIT_SKU:
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
  createSku: createSkuReducer,
  editSku: editSkuReducer,
});
