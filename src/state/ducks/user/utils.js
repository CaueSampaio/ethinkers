import jwtDecode from 'jwt-decode';
import { isEmpty } from 'lodash';

function getLocalStorageUser() {
  return getUserData(localStorage.getItem('token'));
}

function setLocalStorageUser({ token }) {
  localStorage.setItem('token', token);
}

function removeLocalStorageUser() {
  localStorage.removeItem('token');
}

function getUserData(token) {
  if (isEmpty(token)) return null;

  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (err) {
    return null;
  }

  const { CompanyBranchId, User, UserType } = decodedToken;

  return { CompanyBranchId, User, token, UserType };
}

export default {
  getLocalStorageUser,
  setLocalStorageUser,
  removeLocalStorageUser,
  getUserData,
};
