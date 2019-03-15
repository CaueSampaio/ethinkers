import { combineReducers } from 'redux';

import layout from '../ducks/layout';

export function createRootReducer() {
  return combineReducers({
    layout,
  });
}
