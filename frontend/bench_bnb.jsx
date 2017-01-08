import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { login, logout, signup } from './actions/session_actions';
// import { login, logout } from './util/session_api_util';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  window.login = login;
  window.logout = logout;
  window.signup = signup;
  let store;
  if (window.currentUser) {
    const preloadedState = {session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
  }else {
    store = configureStore();
  }
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
