import { createSelector } from 'reselect';

const selectUser = ({ user }) => user;

const makeSelectUsers = () =>
  createSelector(
    selectUser,
    ({ data }) => data,
  );

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

export default {
  selectUser,
  makeSelectUsers,
  makeSelectUserLoading,
  makeSelectUserError,
  makeSelectUserData,
};
