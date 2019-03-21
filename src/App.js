import React from 'react';
import { Switch, withRouter } from 'react-router-dom';

import './App.less';

import routes from './routes';

const App = () => (
  <Switch>
    {routes.map(({ layout: Layout, ...rest }) => (
      <Layout key={rest.path} {...rest} />
    ))}
  </Switch>
);

export default withRouter(App);
