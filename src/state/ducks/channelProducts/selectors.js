import { createSelector } from 'reselect';

// LIST PRODUCTS
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

// FIND PRODUCT
const selectFindChannelProduct = ({
  channelProducts: { findChannelProduct },
}) => findChannelProduct;
const makeSelectFindChannelProduct = () =>
  createSelector(
    selectFindChannelProduct,
    ({ data }) => data,
  );
const makeSelectFindChannelProductIsLoading = () =>
  createSelector(
    selectFindChannelProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectFindChannelProductError = () =>
  createSelector(
    selectFindChannelProduct,
    ({ error }) => error,
  );

// REMOVE PRODUCT
const selectRemoveChannelProduct = ({
  channelProducts: { removeChannelProduct },
}) => removeChannelProduct;
const makeSelectRemoveChannelProduct = () =>
  createSelector(
    selectRemoveChannelProduct,
    ({ data }) => data,
  );
const makeSelectRemoveChannelProductIsLoading = () =>
  createSelector(
    selectRemoveChannelProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectRemoveChannelProductError = () =>
  createSelector(
    selectRemoveChannelProduct,
    ({ error }) => error,
  );

// LIST SUMMARY
const selectListChannelProductSummary = ({
  channelProducts: { listSummary },
}) => listSummary;
const makeSelectListChannelProductSummary = () =>
  createSelector(
    selectListChannelProductSummary,
    ({ data }) => data,
  );
const makeSelectListChannelProductSummaryIsLoading = () =>
  createSelector(
    selectListChannelProductSummary,
    ({ isLoading }) => isLoading,
  );
const makeSelectListChannelProductSummaryError = () =>
  createSelector(
    selectListChannelProductSummary,
    ({ error }) => error,
  );

// ENABLE OR DISABLE PRODUCT
const selectEnableOrDisableProduct = ({
  channelProducts: { enableOrDisableProduct },
}) => enableOrDisableProduct;
const makeSelectEnableOrDisableProduct = () =>
  createSelector(
    selectEnableOrDisableProduct,
    ({ data }) => data,
  );
const makeSelectEnableOrDisableProductIsLoading = () =>
  createSelector(
    selectEnableOrDisableProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectEnableOrDisableProductError = () =>
  createSelector(
    selectEnableOrDisableProduct,
    ({ error }) => error,
  );

export default {
  // LIST PRODUCTS
  selectChannelProducts,
  makeSelectChannelProducts,
  makeSelectChannelProductsIsLoading,
  makeSelectChannelProductsError,

  // FIND PRODUCT
  selectFindChannelProduct,
  makeSelectFindChannelProduct,
  makeSelectFindChannelProductIsLoading,
  makeSelectFindChannelProductError,

  // REMOVE PRODUCT
  makeSelectRemoveChannelProduct,
  makeSelectRemoveChannelProductIsLoading,
  makeSelectRemoveChannelProductError,

  // LIST PRODUCTS SUMMARY
  selectListChannelProductSummary,
  makeSelectListChannelProductSummary,
  makeSelectListChannelProductSummaryIsLoading,
  makeSelectListChannelProductSummaryError,

  // ENABLE OR DISABLE PRODUCT
  selectEnableOrDisableProduct,
  makeSelectEnableOrDisableProduct,
  makeSelectEnableOrDisableProductIsLoading,
  makeSelectEnableOrDisableProductError,
};
