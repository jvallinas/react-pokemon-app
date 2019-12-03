import { createStore } from 'redux';
import reducer from './reducers/reducer';

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
}
