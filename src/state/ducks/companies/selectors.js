import { createSelector } from 'reselect';

// LIST COMPANIES
const selectCompanies = ({ companies: { listCompanies } }) => listCompanies;
const makeSelectCompanies = () =>
  createSelector(
    selectCompanies,
    ({ data }) => data,
  );
const makeSelectCompaniesIsLoading = () =>
  createSelector(
    selectCompanies,
    ({ isLoading }) => isLoading,
  );
const makeSelectCompaniesError = () =>
  createSelector(
    selectCompanies,
    ({ error }) => error,
  );

export default {
  //  LIST COMPANIES
  selectCompanies,
  makeSelectCompanies,
  makeSelectCompaniesIsLoading,
  makeSelectCompaniesError,
};
