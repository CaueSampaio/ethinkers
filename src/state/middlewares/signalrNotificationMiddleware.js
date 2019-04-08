import { userTypes } from '../ducks/user';

import { notificationsSignalR } from '../ducks/notifications';

// eslint-disable-next-line
export default (store) => (next) => (action) => {
  const types = Object.keys(userTypes).map((key) => userTypes[key]);
  const lifecycle = action.meta ? action.meta['redux-pack/LIFECYCLE'] : null;

  const found =
    types.includes(action.type) &&
    (lifecycle === null || lifecycle === 'success');

  if (found) {
    if (action.type === userTypes.HANDLE_LOGOUT) {
      notificationsSignalR.disconnect(store, () => {
        console.log('NOTIFICATIONS HUB DISCONNECTED'); // eslint-disable-line
      });
    } else {
      const { token } = action.payload;

      notificationsSignalR.registerCommands(store, token, () => {
        console.log(token, store);
        console.log('NOTIFICATIONS HUB CONNECTED'); // eslint-disable-line
      });
    }
  }

  return next(action);
};
