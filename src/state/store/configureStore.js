import { middleware as reduxPackMiddleware } from 'redux-pack';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';

import { createRootReducer } from '../reducer';

export default function configureStore(history, initialState) {
  const middleware = [reduxPackMiddleware, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line
  }

  const rootReducer = createRootReducer();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducer', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
}
