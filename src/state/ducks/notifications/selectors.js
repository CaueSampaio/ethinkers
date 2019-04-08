import { createSelector } from 'reselect';

const selectNotifications = ({ notifications: { list } }) => list;
const makeSelectNotifications = () =>
  createSelector(
    selectNotifications,
    ({ data }) => data,
  );
const makeSelectNotificationsIsLoading = () =>
  createSelector(
    selectNotifications,
    ({ isLoading }) => isLoading,
  );
const makeSelectNotificationsError = () =>
  createSelector(
    selectNotifications,
    ({ error }) => error,
  );

export default {
  selectNotifications,
  makeSelectNotifications,
  makeSelectNotificationsIsLoading,
  makeSelectNotificationsError,
};
