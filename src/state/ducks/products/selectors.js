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

// FIND PRODUCT
const selectFindProduct = ({ products: { findProduct } }) => findProduct;
const makeSelectFindProduct = () =>
  createSelector(
    selectFindProduct,
    ({ data }) => data,
  );
const makeSelectFindProductIsLoading = () =>
  createSelector(
    selectFindProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectFindProductError = () =>
  createSelector(
    selectFindProduct,
    ({ error }) => error,
  );

// EDIT PRODUCT
const selectEditProduct = ({ products: { editProduct } }) => editProduct;
const makeSelectEditProduct = () =>
  createSelector(
    selectEditProduct,
    ({ data }) => data,
  );
const makeSelectEditProductIsLoading = () =>
  createSelector(
    selectEditProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectEditProductError = () =>
  createSelector(
    selectEditProduct,
    ({ error }) => error,
  );

// SELECT PRODUCT
const selectSelectedProducts = ({ products: { selectProduct } }) =>
  selectProduct;
const makeSelectSelectedProducts = () =>
  createSelector(
    selectSelectedProducts,
    (data) => data,
  );

// EXPORT PRODUCT
const selectExportProduct = ({ products: { exportProducts } }) =>
  exportProducts;
const makeSelectExportProducts = () =>
  createSelector(
    selectExportProduct,
    ({ data }) => data,
  );
const makeSelectExportProductsIsLoading = () =>
  createSelector(
    selectExportProduct,
    ({ isLoading }) => isLoading,
  );
const makeSelectExportProductsError = () =>
  createSelector(
    selectEditProduct,
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

  // FIND PRODUCT
  selectFindProduct,
  makeSelectFindProduct,
  makeSelectFindProductIsLoading,
  makeSelectFindProductError,

  // EDIT PRODUCT
  selectEditProduct,
  makeSelectEditProduct,
  makeSelectEditProductIsLoading,
  makeSelectEditProductError,

  // SELECT PRODUCTS
  selectSelectedProducts,
  makeSelectSelectedProducts,

  // EXPORT PRODUCTS
  selectExportProduct,
  makeSelectExportProducts,
  makeSelectExportProductsIsLoading,
  makeSelectExportProductsError,
};
