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

export default combineReducers({
  listChannelProducts: listChannelProductsReducer,
});
