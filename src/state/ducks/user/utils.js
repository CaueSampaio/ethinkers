function getLocalStorageUsers() {
  return localStorage.getItem('users');
}

function setLocalStorageUsers(users) {
  const localUsers = [];
  localUsers.push(JSON.parse(localStorage.getItem('users')));
  if (localUsers.length < 1) {
    users.forEach((item) => localUsers.push(item));
    localStorage.setItem('users', JSON.stringify(localUsers));
    debugger; //eslint-disable-line
  }
}

function removeLocalStorageUser(index) {
  const localUsers = JSON.parse(localStorage.getItem('users'));
  localUsers.splice(index, 1);
  localStorage.setItem('users', JSON.stringify(localUsers));
}

export default {
  removeLocalStorageUser,
  setLocalStorageUsers,
  getLocalStorageUsers,
};
