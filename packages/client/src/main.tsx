import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './app/styles/scss/index.scss';
import 'normalize.css';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary';
import store from './store';

delete window.__PRELOADED_STATE__;

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

if (rootElement.innerHTML === '<!--ssr-outlet-->') {
  ReactDOM.createRoot(rootElement).render(app);
} else {
  ReactDOM.hydrateRoot(rootElement, app);
}
