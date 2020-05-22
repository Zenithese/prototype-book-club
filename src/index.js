import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'
import configureStore from './store'
import './assests/index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore();

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.getProps = store.getProps;
  
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
