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

// LIST CHANNELS BRANDS
const selectChannelsBrands = ({ channels: { listBrands } }) => listBrands;
const makeSelectChannelBrands = () =>
  createSelector(
    selectChannelsBrands,
    ({ data }) => data,
  );
const makeSelectChannelBrandsIsLoading = () =>
  createSelector(
    selectChannelsBrands,
    ({ isLoading }) => isLoading,
  );
const makeSelectChannelBrandsError = () =>
  createSelector(
    selectChannelsBrands,
    ({ error }) => error,
  );

// LIST CHANNELS CATEGORIES
const selectChannelsCategories = ({ channels: { listCategories } }) =>
  listCategories;
const makeSelectChannelCategories = () =>
  createSelector(
    selectChannelsCategories,
    ({ data }) => data,
  );
const makeSelectChannelCategoriesIsLoading = () =>
  createSelector(
    selectChannelsCategories,
    ({ isLoading }) => isLoading,
  );
const makeSelectChannelCategoriesError = () =>
  createSelector(
    selectChannelsCategories,
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

  // LIST CHANNEL BRANDS
  selectChannelsBrands,
  makeSelectChannelBrands,
  makeSelectChannelBrandsIsLoading,
  makeSelectChannelBrandsError,

  // LIST CHANNEL CATEGORIES
  selectChannelsCategories,
  makeSelectChannelCategories,
  makeSelectChannelCategoriesIsLoading,
  makeSelectChannelCategoriesError,
};
