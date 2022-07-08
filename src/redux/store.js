import React from 'react';
import rootReducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const middleware = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
function DataProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default DataProvider;
