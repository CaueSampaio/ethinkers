import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import 'moment/locale/pt-br';

import configureStore from './state/store/configureStore';
import App from './App';

// Create browser history to use in the Redux store
const baseUrl = (document.getElementsByTagName('base')[0] || {}).href;
export const history = createBrowserHistory({ basename: baseUrl });

const initialState = window.initialReduxState;
export const store = configureStore(history, initialState);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LocaleProvider locale={ptBR}>
        <App />
      </LocaleProvider>
    </ConnectedRouter>
  </Provider>,
  rootElement,
);
