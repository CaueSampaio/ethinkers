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

export default {
  selectCreateSku,
  makeSelectCreateSku,
  makeSelectCreateSkuIsLoading,
  makeSelectCreateSkuError,
};
