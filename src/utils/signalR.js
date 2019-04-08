import { HubConnectionBuilder } from '@aspnet/signalr';

import { API } from './constants';

export default (hub, token) => {
  const hubPath = `${API.replace('/api', '')}/hub/`;

  return new HubConnectionBuilder()
    .withUrl(`${hubPath}${hub}`, {
      accessTokenFactory: () => token,
    })
    .build();
};
