import { combineReducers } from 'redux';

import layout from '../ducks/layout';
import orders from '../ducks/orders';

export function createRootReducer() {
  return combineReducers({
    layout,
    orders,
  });
}
