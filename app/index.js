import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import fieldMap from './pages/Components/homePage/fieldMap.json';


import Root from './pages/Root';
import reducers from './pages/redux/input-reducer';

const initData = { fieldMap, inputValues: {} };

const store = createStore(
  reducers,
  initData
);

render(<Root store={store} />, document.getElementById('app'));
