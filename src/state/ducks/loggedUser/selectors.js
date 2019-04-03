import { createSelector } from 'reselect';

// UPDATE PASSWORD
const selectUpdatePassword = ({ loggedUser: { updatePassword } }) =>
  updatePassword;
const makeSelectUpdatePasswordIsLoading = () =>
  createSelector(
    selectUpdatePassword,
    ({ isLoading }) => isLoading,
  );
const makeSelectUpdatePasswordError = () =>
  createSelector(
    selectUpdatePassword,
    ({ error }) => error,
  );

export default {
  selectUpdatePassword,
  makeSelectUpdatePasswordIsLoading,
  makeSelectUpdatePasswordError,
};
