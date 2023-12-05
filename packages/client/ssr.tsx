import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './src/App';
import { createStore } from './src/store';
import { store } from '../server/store';

export { createStore };

// const store = createStore(undefined);

export function render(url: string) {
  const appHTML = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();
  // eslint-disable-next-line no-console
  console.log('NEW_preloadedState', preloadedState);

  return [appHTML, preloadedState];
}
