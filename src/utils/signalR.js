import { HubConnectionBuilder } from '@aspnet/signalr';

import { API } from './constants';

export default (hub, token) => {
  const hubPath = `${API}/sockets/notification`;
  console.log(hubPath);
  return new HubConnectionBuilder()
    .withUrl(`${hubPath}`, {
      accessTokenFactory: () => token,
    })
    .build();
};
