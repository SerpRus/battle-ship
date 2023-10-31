import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/scss/index.scss';
import 'normalize.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
