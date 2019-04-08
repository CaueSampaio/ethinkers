import createHub from '../../../utils/signalR';

// import actions from './actions';

let notificationHub = null;

const registerCommands = (store, token, callback) => {
  notificationHub = createHub('notifications', token);

  notificationHub.on('ReceiveNotification', (data) => {
    console.log(data);
    // store.dispatch(actions.notificationsReceived(data));
  });

  notificationHub.start().then(() => callback());
};

const disconnect = (store, callback) => {
  if (notificationHub) {
    notificationHub.stop().then(() => {
      notificationHub = null;

      // store.dispatch(actions.clearActiveNotifications());

      callback();
    });
  }
};

export default {
  registerCommands,
  disconnect,
};
