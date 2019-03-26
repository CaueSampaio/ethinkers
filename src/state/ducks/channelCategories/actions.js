import types from './types';
import { get } from '../../../utils/request';

function listAllCategoryAttributeChannelId(id) {
  return {
    type: types.LIST_ALL_CATEGORY_ATTRIBUTE_CHANNEL_ID,
    promise: get(`channelcategories/${id}/attributes`),
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
