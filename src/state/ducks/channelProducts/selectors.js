import { createSelector } from 'reselect';

const selectChannelProducts = ({ channelProducts: { listChannelProducts } }) =>
  listChannelProducts;
const makeSelectChannelProducts = () =>
  createSelector(
    selectChannelProducts,
    ({ data }) => data,
  );
const makeSelectChannelProductsIsLoading = () =>
  createSelector(
    selectChannelProducts,
    ({ isLoading }) => isLoading,
  );
const makeSelectChannelProductsError = () =>
  createSelector(
    selectChannelProducts,
    ({ error }) => error,
  );

export default {
  // LIST PRODUCTS
  selectChannelProducts,
  makeSelectChannelProducts,
  makeSelectChannelProductsIsLoading,
  makeSelectChannelProductsError,
};
