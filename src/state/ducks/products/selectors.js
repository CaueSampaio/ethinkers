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

// CREATE PRODUCT
const selectCreateProduct = ({ products: { createProduct } }) => createProduct;
const makeSelectCreateProduct = () =>
  createSelector(
    selectCreateProduct,
    ({ data }) => data,
  );
const makeSelectCreateProductIsLoading = () =>
  createSelector(
    selectCreateProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectCreateProductError = () =>
  createSelector(
    selectCreateProduct,
    ({ error }) => error,
  );

// EDIT PRODUCT STATUS
const selectEditProductStatus = ({ products: { editProductStatus } }) =>
  editProductStatus;
const makeSelectEditProductStatus = () =>
  createSelector(
    selectEditProductStatus,
    ({ data }) => data,
  );
const makeSelectEditProductStatusIsLoading = () =>
  createSelector(
    selectEditProductStatus,
    ({ isLoading }) => isLoading,
  );
const makeSelectEditProductStatusError = () =>
  createSelector(
    selectEditProductStatus,
    ({ error }) => error,
  );

// REMOVE PRODUCT
const selectRemoveProduct = ({ products: { removeProduct } }) => removeProduct;
const makeSelectRemoveProductIsLoading = () =>
  createSelector(
    selectRemoveProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectRemoveProductError = () =>
  createSelector(
    selectRemoveProduct,
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

  // CREATE PRODUCT
  selectCreateProduct,
  makeSelectCreateProduct,
  makeSelectCreateProductIsLoading,
  makeSelectCreateProductError,

  // EDIT PRODUCT STATUS
  selectEditProductStatus,
  makeSelectEditProductStatus,
  makeSelectEditProductStatusIsLoading,
  makeSelectEditProductStatusError,

  // REMOVE PRODUCT
  selectRemoveProduct,
  makeSelectRemoveProductIsLoading,
  makeSelectRemoveProductError,
};
