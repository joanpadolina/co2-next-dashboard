import allReducer from '../redux/reducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Navigation from '../components/nav/nav';
import '../styles/globals.css';
import FormModal from '../components/modal/modal';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(allReducer, composedEnhancer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Navigation />
      <FormModal />
    </Provider>
  );
}

export default MyApp;
