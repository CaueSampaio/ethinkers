import { createSelector } from 'reselect';

const selectCategories = ({ categories: { listCategories } }) => listCategories;
const makeSelectCategories = () =>
  createSelector(
    selectCategories,
    ({ data }) => data,
  );
const makeSelectCategoriesIsLoading = () =>
  createSelector(
    selectCategories,
    ({ isLoading }) => isLoading,
  );
const makeSelectCategoriesError = () =>
  createSelector(
    selectCategories,
    ({ error }) => error,
  );

export default {
  // List
  selectCategories,
  makeSelectCategories,
  makeSelectCategoriesIsLoading,
  makeSelectCategoriesError,
};
