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
import channelSkus from '../ducks/channelSkus';
import skus from '../ducks/skus';
import user from '../ducks/user';
import loggedUser from '../ducks/loggedUser';
import companies from '../ducks/companies';
import notifications from '../ducks/notifications';

export function createRootReducer() {
  return combineReducers({
    layout,
    router: routerReducer,
    orders,
    brands,
    categories,
    channels,
    channelProducts,
    channelCategories,
    channelSkus,
    products,
    skus,
    user,
    loggedUser,
    companies,
    notifications,
  });
}
