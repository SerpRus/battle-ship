import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app/styles/scss/index.scss';
import 'normalize.css';
import ErrorBoundary from './app/providers/ErrorBoundary/ErrorBoundary';
import { ProvideAuth } from './app/providers/AuthProvider/AuthProvider';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ErrorBoundary>
  </React.StrictMode>
);
