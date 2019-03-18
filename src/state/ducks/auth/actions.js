// import types from './types';

/**
 * Action that dispatches the request for the login in the api
 *
 * @param {Object} credentials Object containing the user credentials
 * @param {String} credentials.login The user login
 * @param {String} credentials.password The user password
 */
// function handleLogin(credentials) {
//   return {
//     type: types.HANDLE_LOGIN,
//     promise: post(`auth`, credentials),
//     meta: {
//       onSuccess: (response) => utils.setLocalStorageUser(response),
//     },
//   };
// }

// function handleLogout() {
//   return {
//     type: types.HANDLE_LOGOUT,
//   };
// }

// /**
//  * Action that dispatches the request to verify the user token in the api.
//  * In case of failure, clears user reducer.
//  * In case of success, refreshes the user token.
//  */
// function verifyToken() {
//   return {
//     type: types.VERIFY_TOKEN,
//     promise: post(`auth/refresh`),
//     meta: {
//       onSuccess: (response) => {
//         utils.setLocalStorageUser(response);
//       },
//       onFailure: () => {
//         utils.removeLocalStorageUser();
//       },
//     },
//   };
// }

// export default {
//   handleLogin,
//   handleLogout,
//   verifyToken,
// };
