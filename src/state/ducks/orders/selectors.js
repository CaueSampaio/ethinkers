import { createSelector } from 'reselect';

const selectOrders = ({ orders: { listOrders } }) => listOrders;
const makeSelectOrders = () =>
  createSelector(
    selectOrders,
    ({ data }) => data,
  );
const makeSelectOrdersIsLoading = () =>
  createSelector(
    selectOrders,
    ({ isLoading }) => isLoading,
  );
const makeSelectOrdersError = () =>
  createSelector(
    selectOrders,
    ({ error }) => error,
  );

export default {
  // List
  selectOrders,
  makeSelectOrders,
  makeSelectOrdersIsLoading,
  makeSelectOrdersError,
};
