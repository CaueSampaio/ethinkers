import { createSelector } from 'reselect';

const selectEditChannelSku = ({ channelSkus: { editChannelSku } }) =>
  editChannelSku;
const makeSelectEditChannelSkuIsLoading = () =>
  createSelector(
    selectEditChannelSku,
    ({ isLoading }) => isLoading,
  );
const makeSelectEditSkuError = () =>
  createSelector(
    selectEditChannelSku,
    ({ error }) => error,
  );

export default {
  // EDIT CHANNEL SKU
  selectEditChannelSku,
  makeSelectEditChannelSkuIsLoading,
  makeSelectEditSkuError,
};
