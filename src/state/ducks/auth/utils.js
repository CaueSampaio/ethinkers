import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';

/**
 * Gets previously logged user from localStorage
 *
 * @returns {{userId: String, token: String}} User saved in localStorage
 */
function getLocalStorageUser() {
  return getUserData(localStorage.getItem('token'));
}

/**
 * Sets logged user in localStorage
 *
 * @param {Object} user Logged user info
 * @param {String} user.userId Logged user UserId
 * @param {String} user.token Logged user JWT token
 */
function setLocalStorageUser({ token }) {
  localStorage.setItem('token', token);
}

/**
 * Removes logged user data from localStorage
 */
function removeLocalStorageUser() {
  localStorage.removeItem('token');
}

/**
 * gets the data from the payload of the login request.
 *
 * @param {Object} payload Data being sent by the back end in the successful logged user situation.
 */
function getUserData(token) {
  if (isEmpty(token)) return null;

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (err) {
    return null;
  }

  const { sub: userId, given_name: givenName, discriminator } = decodedToken;

  return { userId, givenName, token, discriminator };
}

export default {
  getLocalStorageUser,
  setLocalStorageUser,
  removeLocalStorageUser,
  getUserData,
};
