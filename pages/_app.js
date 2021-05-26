import React from 'react'
import allReducer from '../redux/reducer'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Navigation from '../components/nav'
import ChargeInput from '../components/charge-input-modal'
import Head from 'next/head'
import '../styles/globals.css'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(allReducer, composedEnhancer)

async function getData() {
  const firebaseStore = await fetch('/api/entries')
  const json = await firebaseStore.json()
  return {
    json
  }
}

const data = getData()
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>CO2 smart charging</title>
        <link rel='icon' href='/favicon_io/favicon.ico' />
      </Head>
      <Navigation />
      <Component {...pageProps} data={data} />
      <ChargeInput />
    </Provider>
  )
}

export default MyApp
