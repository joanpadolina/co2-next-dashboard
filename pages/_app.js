import React, { useState, useEffect } from 'react';
import allReducer from '../redux/reducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Navigation from '../components/nav/nav';
import ChargeInput from '../components/charge-input/charge-input-modal';
import { fetchUser } from '../redux/actions';

import '../styles/globals.css';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(allReducer, composedEnhancer);
store.dispatch(fetchUser)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Navigation />
      <ChargeInput />
    </Provider>
  );
}

export default MyApp;
