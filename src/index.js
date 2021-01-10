import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import './App.scss';

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const logger = createLogger();

const store = createStore(reducer, applyMiddleware(logger, thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
