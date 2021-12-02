import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import testCaseReducer from './reducers/testCaseReducer';
import './styles/index.css';
import App from './App';

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  ( 
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && 
      // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  ) || compose
);

const testCaseStore = createStore(
  testCaseReducer,
  allStoreEnhancers
);

export type RootState = ReturnType<typeof testCaseStore.getState>;
export type AppDispatch = typeof testCaseStore.dispatch;

ReactDOM.render(
  <Provider store={testCaseStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = testCaseStore;
}

registerServiceWorker();
