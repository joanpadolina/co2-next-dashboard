import React from 'react'
import allReducer from '../redux/reducer'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Navigation from '../components/nav'
import ChargeInput from '../components/charge-input-modal'

import '../styles/globals.css'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(allReducer, composedEnhancer)

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navigation />
      <Component {...pageProps} />
      <ChargeInput />
    </Provider>
  )
}

export default MyApp
