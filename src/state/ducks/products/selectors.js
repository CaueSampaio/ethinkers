import { createSelector } from 'reselect';

// LIST PRODUCTS
const selectProducts = ({ products: { listProducts } }) => listProducts;
const makeSelectProducts = () =>
  createSelector(
    selectProducts,
    ({ data }) => data,
  );
const makeSelectProductsIsLoading = () =>
  createSelector(
    selectProducts,
    ({ isLoading }) => isLoading,
  );
const makeSelectProductsError = () =>
  createSelector(
    selectProducts,
    ({ error }) => error,
  );

// LIST STATUS
const selectStatus = ({ products: { listStatus } }) => listStatus;
const makeSelectStatus = () =>
  createSelector(
    selectStatus,
    ({ data }) => data,
  );
const makeSelectStatusIsLoading = () =>
  createSelector(
    selectStatus,
    ({ isLoading }) => isLoading,
  );
const makeSelectStatusError = () =>
  createSelector(
    selectStatus,
    ({ error }) => error,
  );

export default {
  // LIST PRODUCTS
  selectProducts,
  makeSelectProducts,
  makeSelectProductsIsLoading,
  makeSelectProductsError,

  // LIST STATUS
  selectStatus,
  makeSelectStatus,
  makeSelectStatusIsLoading,
  makeSelectStatusError,
};
