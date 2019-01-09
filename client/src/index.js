import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import testCaseReducer from './reducers/testCaseReducer'
import App from './App'

const allStoreEnhancers = compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
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
registerServiceWorker();
