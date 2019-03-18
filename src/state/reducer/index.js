import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import layout from '../ducks/layout';
import orders from '../ducks/orders';

export function createRootReducer() {
  return combineReducers({
    layout,
    router: routerReducer,
    orders,
  });
}
