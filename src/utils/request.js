import { isEmpty } from 'lodash';
import { parse } from 'content-disposition';
import { saveAs } from 'file-saver';

import axios from './axios';
import defaultRequestHandlers from './requestHandlers';
import { API } from './constants';

/**
 * Sends GET request to the specified URL.
 *
 * @param {String} url URL to send the GET request.
 */
export const get = (url) =>
  request(url, {
    method: 'GET',
  });

/**
 * Sends POST request to the specified URL with the specified body.
 *
 * @param {String} url URL to send the POST request.
 * @param {Object} data Data to be sended as request body.
 */
export const post = (url, data) =>
  request(url, {
    method: 'POST',
    data,
  });

/**
 * Sends PATCH request to the specified URL with the specified body.
 *
 * @param {String} url URL to send the PATCH request.
 * @param {Object} data Data to be sended as request body.
 */
export const patch = (url, data) =>
  request(url, {
    method: 'PATCH',
    data,
  });

/**
 * Sends PUT request to the URL with the specified body.
 *
 * @param {String} url URL to send the PUT request.
 * @param {Object} data Data to be sended as request body.
 */
export const put = (url, data) =>
  request(url, {
    method: 'PUT',
    data,
  });
/**
 * Sends DELETE request to the specified URL with the specified resource id.
 *
 * @param {String} url URL to send the PATCH request.
 * @param {Object} id Id of the resource that is beign deleted.
 */
export const remove = (
  url,
  id, // eslint-disable-line
) =>
  request(url, {
    method: 'DELETE',
  });

export const downloadFile = (url) =>
  request(url, {
    contentType: 'application/pdf',
    responseType: 'blob',
    successHandler: (res) => {
      const blob = res.data;
      const { parameters = {} } = parse(res.headers['content-disposition']);

      saveAs(blob, parameters.filename);
    },
  });

/**
 * Sends request to the specified URL using axios.
 *
 * @param {String} url URL to send the request.
 * @param {Object} requestParams Params to modify the axios request object.
 * @param {Function} requestParams.requestHandler Custom request handler to be used after the request is done. Defaults to the './defaultRequestHandler' export.
 * @param {Object} requestParams.contentType Content-Type of the request. Defaults to 'application-json'.
 * @param {Object} requestParams.authorization Authorization header of the request. Defaults to the token stored in the localStorage.
 */
export const request = (
  url,
  {
    successHandler = defaultRequestHandlers.success,
    errorHandler = defaultRequestHandlers.error,
    contentType = 'application/json',
    authorization = localStorage.getItem('token'),
    ...customOptions
  },
) => {
  const headers = {};

  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  if (authorization) {
    headers['Authorization'] = `Bearer ${authorization}`; // eslint-disable-line
  }

  const options = {
    ...customOptions,
    headers,
  };

  return axios(url, options)
    .then(successHandler)
    .catch(errorHandler);
};

/**
 * Converts object to query string params
 *
 * @param {Object} params Object containing the params to be transformed in QueryParams
 */
export const getQueryParams = (params) => {
  if (isEmpty(params)) return '';
  console.log(params);
  const urlParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const item = params[key].toString();

    if (!isEmpty(item)) urlParams.append(key, params[key]);
  });

  return `?${urlParams.toString()}`;
};

export const defaultUploadProps = () => ({
  name: 'file',
  action: `${API}/products/import`,
  // headers: {
  //  authorization: `Bearer ${localStorage.getItem('token')}`,
  // },
});

export const uploadChannelProduct = () => ({
  name: 'file',
  action: `${API}/channelproducst/import`,
  // headers: {
  //  authorization: `Bearer ${localStorage.getItem('token')}`,
  // },
});

/**
 * Gets full URL from the specified URI that is comming from the back end
 *
 * @param {String} uri Returned URI from the back end
 */
export const getApiImgUrl = (uri) => {
  if (isEmpty(uri)) return '';
  return `${API}${uri.replace('/api', '')}?token=${localStorage.getItem(
    'token',
  )}`;
};
