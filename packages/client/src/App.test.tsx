import { render, screen } from '@testing-library/react';
import App from './App';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test.skip('Example test', async () => {
  render(<App />);
  expect(screen.getByText('')).toBeDefined();
});
