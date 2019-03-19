import { createSelector } from 'reselect';

const selectBrands = ({ brands: { listBrands } }) => listBrands;
const makeSelectBrands = () =>
  createSelector(
    selectBrands,
    ({ data }) => data,
  );
const makeSelectBrandsIsLoading = () =>
  createSelector(
    selectBrands,
    ({ isLoading }) => isLoading,
  );
const makeSelectBrandsError = () =>
  createSelector(
    selectBrands,
    ({ error }) => error,
  );

export default {
  // List
  selectBrands,
  makeSelectBrands,
  makeSelectBrandsIsLoading,
  makeSelectBrandsError,
};
