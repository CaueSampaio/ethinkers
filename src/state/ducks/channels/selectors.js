import { createSelector } from 'reselect';

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

export default {
  // List
  selectChannels,
  makeSelectChannels,
  makeSelectChannelsIsLoading,
  makeSelectChannelsError,
};
