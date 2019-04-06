import { isEmpty } from 'lodash';

/**
 * Gets the name of the resource based on the object. Returns loading default message if object is null.
 *
 * @param {Object} obj Object to get the resource name.
 * @param {String} objParam Object param to inject in the breadcrumbs.
 * @param {String} paramName Name of the parameter to check in the url params.
 */
function getHeaderResourceName(obj, objParam, paramName) {
  return {
    paramName,
    value: isEmpty(obj) ? 'Carregando...' : obj[objParam],
  };
}

export default getHeaderResourceName;
