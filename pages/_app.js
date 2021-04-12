import React from 'react';
import allReducer from '../redux/reducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Navigation from '../components/nav/nav';
import FormModal from '../components/modal/modal';
import { fetchUser } from '../redux/actions';

import '../styles/globals.css';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(allReducer, composedEnhancer);
store.dispatch(fetchUser)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Navigation isActive={(isBrowser) => setActiveInput(isBrowser)} />
      <FormModal />
    </Provider>
  );
}

export default MyApp;
