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

// CHANGE USER PASSWORD LOGGED IN
const selectChangeUserPasswordLoggedIn = ({
  loggedUser: { changeUserPasswordLoggedIn },
}) => changeUserPasswordLoggedIn;
const makeSelectChangeUserPasswordLoggedInIsLoading = () =>
  createSelector(
    selectUpdatePassword,
    ({ isLoading }) => isLoading,
  );
const makeSelectChangeUserPasswordLoggedInError = () =>
  createSelector(
    selectUpdatePassword,
    ({ error }) => error,
  );

export default {
  selectUpdatePassword,
  makeSelectUpdatePasswordIsLoading,
  makeSelectUpdatePasswordError,

  selectChangeUserPasswordLoggedIn,
  makeSelectChangeUserPasswordLoggedInIsLoading,
  makeSelectChangeUserPasswordLoggedInError,
};
