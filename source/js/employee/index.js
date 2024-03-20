import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {reducer, Operation} from './reducer';
import createAPI from './api';
import thunk from 'redux-thunk';

const api = createAPI();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);

store.dispatch(Operation.loadList());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById(`root`)
);
