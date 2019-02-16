import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reduxCookiesMiddleware, { getStateFromCookies } from 'redux-cookies-middleware';


import App from './App';
import * as serviceWorker from './serviceWorker';
import directorReducer, { initialState } from './redux/reducers';
import rootSaga from './sagas/actions';

import './index.css';

// const c = new Colours();
// c.fetch({ url: '//127.0.0.1:3030', token: '123456767' });

let store = null;
const sagaMiddleware = createSagaMiddleware();

// state to persist in cookies
const paths = {
  'auth.token': { name: 'toystore_token' },
  'auth.isAuthenticated': { name: 'toystore_is_authenticated' },
};

// read stored data in cookies and merge it with the initial state
const cookiedInitialState = getStateFromCookies(initialState, paths);

// create cookies supported middleware
const cookiesMiddleware = reduxCookiesMiddleware(paths);

// Only chrome can handle the redux dev tool
// redux compose cannot handle a null or undefined middleware

// TODO: load authorisation fields from cookies
//
if (window.navigator.userAgent.includes('Chrome')) {
  store = createStore(
    directorReducer,
    cookiedInitialState,
    compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(cookiesMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
  );
} else {
  store = createStore(
    directorReducer,
    initialState,
    compose(applyMiddleware(sagaMiddleware), applyMiddleware(cookiesMiddleware)),
  );
}

// run saga middleware
sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
