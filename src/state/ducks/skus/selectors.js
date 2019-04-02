import { createSelector } from 'reselect';

// CREATE
const selectCreateSku = ({ skus: { createSku } }) => createSku;
const makeSelectCreateSku = () =>
  createSelector(
    selectCreateSku,
    ({ data }) => data,
  );
const makeSelectCreateSkuIsLoading = () =>
  createSelector(
    selectCreateSku,
    ({ isLoading }) => isLoading,
  );
const makeSelectCreateSkuError = () =>
  createSelector(
    selectCreateSku,
    ({ error }) => error,
  );

// EDIT
const selectEditSku = ({ skus: { editSku } }) => editSku;
const makeSelectEditSku = () =>
  createSelector(
    selectEditSku,
    ({ data }) => data,
  );
const makeSelectEditSkuIsLoading = () =>
  createSelector(
    selectEditSku,
    ({ isLoading }) => isLoading,
  );
const makeSelectEditSkuError = () =>
  createSelector(
    selectEditSku,
    ({ error }) => error,
  );

export default {
  // CREATE SKU
  selectCreateSku,
  makeSelectCreateSku,
  makeSelectCreateSkuIsLoading,
  makeSelectCreateSkuError,

  // EDIT SKU
  selectEditSku,
  makeSelectEditSku,
  makeSelectEditSkuIsLoading,
  makeSelectEditSkuError,
};
