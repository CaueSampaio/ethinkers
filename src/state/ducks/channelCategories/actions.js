import types from './types';
import { get } from '../../../utils/request';

function listAllCategoryAttributeChannelId(idChannelCategory) {
  return {
    type: types.LIST_ALL_CATEGORY_ATTRIBUTE_CHANNEL_ID,
    promise: get(`channelcategories/${idChannelCategory}/attributes`),
  };
}

function clearAllCategoryAttributeChannelId() {
  return {
    type: types.CLEAR_ALL_CATEGORY_ATTRIBUTE_CHANNEL_ID,
  };
}

export default {
  listAllCategoryAttributeChannelId,
  clearAllCategoryAttributeChannelId,
};
