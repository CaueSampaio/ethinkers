import { combineReducers } from 'redux';
import { handle } from 'redux-pack';
import types from './types';

const listChannelCategoriesAttributesInitialState = {
  error: null,
  isLoading: false,
  data: [],
};
function listChannelCategoriesAttributesReducer(
  state = listChannelCategoriesAttributesInitialState,
  action,
) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_ALL_CATEGORY_ATTRIBUTE_CHANNEL_ID:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });
    case types.CLEAR_ALL_CATEGORY_ATTRIBUTE_CHANNEL_ID:
      return listChannelCategoriesAttributesInitialState;
    default:
      return state;
  }
}

export default combineReducers({
  listCategoriesAttributes: listChannelCategoriesAttributesReducer,
});
