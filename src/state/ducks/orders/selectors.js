import { createSelector } from 'reselect';

// LIST
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

// FIND
const selectFindOrder = ({ orders: { findOrder } }) => findOrder;
const makeSelectFindOrder = () =>
  createSelector(
    selectFindOrder,
    ({ data }) => data,
  );
const makeSelectFindOrderIsLoading = () =>
  createSelector(
    selectFindOrder,
    ({ isLoading }) => isLoading,
  );
const makeSelectFindOrderError = () =>
  createSelector(
    selectFindOrder,
    ({ error }) => error,
  );

// LIST STATUS
const selectListOrderStatus = ({ orders: { listStatus } }) => listStatus;
const makeSelectListOrderStatus = () =>
  createSelector(
    selectListOrderStatus,
    ({ data }) => data,
  );
const makeSelectListOrderStatusIsLoading = () =>
  createSelector(
    selectListOrderStatus,
    ({ isLoading }) => isLoading,
  );
const makeSelectListOrderStatusError = () =>
  createSelector(
    selectListOrderStatus,
    ({ error }) => error,
  );

export default {
  // LIST
  selectOrders,
  makeSelectOrders,
  makeSelectOrdersIsLoading,
  makeSelectOrdersError,

  // FIND
  selectFindOrder,
  makeSelectFindOrder,
  makeSelectFindOrderIsLoading,
  makeSelectFindOrderError,

  // LIST STATUS
  selectListOrderStatus,
  makeSelectListOrderStatus,
  makeSelectListOrderStatusIsLoading,
  makeSelectListOrderStatusError,
};
