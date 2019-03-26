import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import layout from '../ducks/layout';
import orders from '../ducks/orders';
import brands from '../ducks/brands';
import categories from '../ducks/categories';
import channels from '../ducks/channels';
import channelProducts from '../ducks/channelProducts';
import products from '../ducks/products';
import channelCategories from '../ducks/channelCategories';

export function createRootReducer() {
  return combineReducers({
    layout,
    router: routerReducer,
    orders,
    brands,
    categories,
    channels,
    channelProducts,
    products,
    channelCategories,
  });
}
