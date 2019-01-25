import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import testCaseReducer from './reducers/testCaseReducer'
import './support/index.css';
import App from './App'

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    ( 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && 
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    ) || compose
)

const testCaseStore = createStore(
    testCaseReducer,
    allStoreEnhancers
);

ReactDOM.render(
    <Provider store={testCaseStore}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

if (window.Cypress) {
    window.store = testCaseStore;
}

registerServiceWorker();
