import { combineReducers } from 'redux';
import { handle } from 'redux-pack';
import types from './types';

const editChannelSkuInitialState = {
  error: null,
  isLoading: false,
  data: {},
};
function editChannelSkuReducer(state = editChannelSkuInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.EDIT_CHANNEL_SKU:
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
  editChannelSku: editChannelSkuReducer,
});
