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

// EDIT CHANNEL PRODUCT
const selectEditChannelProduct = ({
  channelProducts: { editChannelProduct },
}) => editChannelProduct;
const makeSelectEditChannelProductIsLoading = () =>
  createSelector(
    selectEditChannelProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectEditChannelProductError = () =>
  createSelector(
    selectEditChannelProduct,
    ({ error }) => error,
  );

// SYNCHRONIZE PRODUCTS
const selectSynchronizeChannelProduct = ({
  channelProducts: { synchronizeChannelProduct },
}) => synchronizeChannelProduct;
const makeSelectSynchronizeChannelProductIsLoading = () =>
  createSelector(
    selectSynchronizeChannelProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectSynchronizeChannelProductError = () =>
  createSelector(
    selectSynchronizeChannelProduct,
    ({ error }) => error,
  );

// CREATE CHANNEL PRODDUCT
const selectCreateChannelProduct = ({
  channelProducts: { createChannelProduct },
}) => createChannelProduct;
const makeSelectCreateChannelProductIsLoading = () =>
  createSelector(
    selectCreateChannelProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectCreateChannelProductError = () =>
  createSelector(
    selectCreateChannelProduct,
    ({ error }) => error,
  );

// LIST UPDATE STATUS
const selectListUpdateStatus = ({ channelProducts: { listUpdateStatus } }) =>
  listUpdateStatus;
const makeSelectListUpdateStatus = () =>
  createSelector(
    selectListUpdateStatus,
    ({ data }) => data,
  );
const makeSelectListUpdateStatusIsLoading = () =>
  createSelector(
    selectListUpdateStatus,
    ({ isLoading }) => isLoading,
  );
const makeSelectListUpdateStatusError = () =>
  createSelector(
    selectListUpdateStatus,
    ({ error }) => error,
  );

// SELECT PRODUCT
const selectSelectedProducts = ({ channelProducts: { selectProduct } }) =>
  selectProduct;
const makeSelectSelectedProducts = () =>
  createSelector(
    selectSelectedProducts,
    (data) => data,
  );

// LIST CHANNEL PRODUCTS STATUS
const selectListStatus = ({ channelProducts: { listStatus } }) => listStatus;
const makeSelectListStatus = () =>
  createSelector(
    selectListStatus,
    ({ data }) => data,
  );
const makeSelectListStatusIsLoading = () =>
  createSelector(
    selectListStatus,
    ({ isLoading }) => isLoading,
  );
const makeSelectListStatusError = () =>
  createSelector(
    selectListStatus,
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

  //  EDIT CHANNEL PRODUCT
  selectEditChannelProduct,
  makeSelectEditChannelProductIsLoading,
  makeSelectEditChannelProductError,

  // SYNCHRONIZE CHANNEL PRODUCT
  selectSynchronizeChannelProduct,
  makeSelectSynchronizeChannelProductIsLoading,
  makeSelectSynchronizeChannelProductError,

  // CREATE CHANNEL PRODUCT
  selectCreateChannelProduct,
  makeSelectCreateChannelProductIsLoading,
  makeSelectCreateChannelProductError,

  // LIST UPDATE STATUS
  selectListUpdateStatus,
  makeSelectListUpdateStatus,
  makeSelectListUpdateStatusIsLoading,
  makeSelectListUpdateStatusError,

  // LIST SELECTED PRDODUCTS
  selectSelectedProducts,
  makeSelectSelectedProducts,

  // LIST STATUS
  selectListStatus,
  makeSelectListStatus,
  makeSelectListStatusIsLoading,
  makeSelectListStatusError,
};
