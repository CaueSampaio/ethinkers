import types from './types';
import { get, getQueryParams } from '../../../utils/request';

function listChannels(params) {
  return {
    type: types.LIST_CHANNELS,
    promise: get(`channels${getQueryParams(params)}`),
  };
}

function clearChannels() {
  return {
    type: types.CLEAR_CHANNELS,
  };
}

function listChannelsStatus() {
  return {
    type: types.LIST_CHANNELS_STATUS,
    promise: get(`channels/status`),
  };
}

function clearChannelsStatus() {
  return {
    type: types.CLEAR_CHANNELS_STATUS,
  };
}

function listAllBrandsPerChannelId(id, data) {
  return {
    type: types.LIST_ALL_BRANDS_PER_CHANNEL_ID,
    promise: get(`channels/${id}/brands${getQueryParams(data)}`),
  };
}

function listBrands(idChannel) {
  return {
    type: types.LIST_CHANNEL_BRANDS,
    promise: get(`channels/${idChannel}/brands`),
  };
}

function clearBrands() {
  return {
    type: types.CLEAR_CHANNEL_BRANDS,
  };
}

function listCategories(idChannelCategory) {
  return {
    type: types.LIST_CHANNEL_CATEGORIES,
    promise: get(`channels/${idChannelCategory}/categories`),
  };
}

function clearCategories() {
  return {
    type: types.CLEAR_CHANNEL_CATEGORIES,
  };
}

export default {
  listChannels,
  clearChannels,

  listChannelsStatus,
  clearChannelsStatus,

  listAllBrandsPerChannelId,

  listBrands,
  listCategories,

  clearBrands,
  clearCategories,
};
