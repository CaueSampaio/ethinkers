import { createSelector } from 'reselect';

// LIST CHANNELS
const selectChannels = ({ channels: { listChannels } }) => listChannels;
const makeSelectChannels = () =>
  createSelector(
    selectChannels,
    ({ data }) => data,
  );
const makeSelectChannelsIsLoading = () =>
  createSelector(
    selectChannels,
    ({ isLoading }) => isLoading,
  );
const makeSelectChannelsError = () =>
  createSelector(
    selectChannels,
    ({ error }) => error,
  );

// LIST CHANNELS STATUS
const selectChannelsStatus = ({ channels: { listChannelsStatus } }) =>
  listChannelsStatus;
const makeSelectChannelsStatus = () =>
  createSelector(
    selectChannelsStatus,
    ({ data }) => data,
  );
const makeSelectChannelsStatusIsLoading = () =>
  createSelector(
    selectChannelsStatus,
    ({ isLoading }) => isLoading,
  );
const makeSelectChannelsStatusError = () =>
  createSelector(
    selectChannelsStatus,
    ({ error }) => error,
  );

export default {
  // LIST CHANNELS
  selectChannels,
  makeSelectChannels,
  makeSelectChannelsIsLoading,
  makeSelectChannelsError,

  // LIST CHANNELS STATUS
  selectChannelsStatus,
  makeSelectChannelsStatus,
  makeSelectChannelsStatusIsLoading,
  makeSelectChannelsStatusError,
};
