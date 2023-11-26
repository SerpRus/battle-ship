import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './app/styles/scss/index.scss';
import 'normalize.css';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary';
import { ProvideAuth } from './app/providers/AuthProvider/AuthProvider';

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <ErrorBoundary>
      <ProvideAuth>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProvideAuth>
    </ErrorBoundary>
  </React.StrictMode>
);

if (rootElement.innerHTML === '<!--ssr-outlet-->') {
  ReactDOM.createRoot(rootElement).render(app);
} else {
  ReactDOM.hydrateRoot(rootElement, app);
}
