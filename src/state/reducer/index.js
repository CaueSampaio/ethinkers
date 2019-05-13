import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import layout from '../ducks/layout';
import user from '../ducks/user';

export function createRootReducer() {
  return combineReducers({
    layout,
    router: routerReducer,
    user,
  });
}
