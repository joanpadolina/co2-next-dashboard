import React, { useState, useEffect } from "react";
import allReducer from "../redux/reducer";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import Navigation from "../components/nav/nav";
import FormModal from "../components/modal/modal";
import "../styles/globals.css";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(allReducer, composedEnhancer);

function MyApp({ Component, pageProps }) {
  const [activeInput, setActiveInput] = useState(false);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Navigation isActive={isBrowser => setActiveInput(isBrowser)} />
      <FormModal />
    </Provider>
  );
}

export default MyApp;
