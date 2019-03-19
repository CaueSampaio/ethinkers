import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import layout from '../ducks/layout';
import orders from '../ducks/orders';
import brands from '../ducks/brands';
import categories from '../ducks/categories';
import channels from '../ducks/channels';

export function createRootReducer() {
  return combineReducers({
    layout,
    router: routerReducer,
    orders,
    brands,
    categories,
    channels,
  });
}
