import { createSelector } from 'reselect';

// LIST CATEGORIES ATTRIBUTES
const selectCategoriesAttributes = ({
  channelCategories: { listCategoriesAttributes },
}) => listCategoriesAttributes;
const makeSelectCategoriesAttributes = () =>
  createSelector(
    selectCategoriesAttributes,
    ({ data }) => data,
  );
const makeSelectCategoriesAttributesIsLoading = () =>
  createSelector(
    selectCategoriesAttributes,
    ({ isLoading }) => isLoading,
  );
const makeSelectCategoriesAttributesError = () =>
  createSelector(
    selectCategoriesAttributes,
    ({ error }) => error,
  );

export default {
  selectCategoriesAttributes,
  makeSelectCategoriesAttributes,
  makeSelectCategoriesAttributesIsLoading,
  makeSelectCategoriesAttributesError,
};
