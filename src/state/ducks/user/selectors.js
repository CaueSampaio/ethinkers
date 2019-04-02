import { createSelector } from 'reselect';

const selectUser = ({ user }) => user;

const makeSelectUserLoading = () =>
  createSelector(
    selectUser,
    ({ isLoading }) => isLoading,
  );

const makeSelectUserError = () =>
  createSelector(
    selectUser,
    ({ error }) => error,
  );

const makeSelectUserData = () =>
  createSelector(
    selectUser,
    ({ data }) => data,
  );

const makeSelectVerifyTokenLoading = () =>
  createSelector(
    selectUser,
    ({ verifyIsLoading }) => verifyIsLoading,
  );

const makeSelectVerifyTokenError = () =>
  createSelector(
    selectUser,
    ({ verifyError }) => verifyError,
  );

export default {
  selectUser,
  makeSelectUserLoading,
  makeSelectUserError,
  makeSelectUserData,
  makeSelectVerifyTokenLoading,
  makeSelectVerifyTokenError,
};
