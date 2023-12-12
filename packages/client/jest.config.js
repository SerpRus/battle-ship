import dotenv from 'dotenv';

dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '@root/serviceWorker?url': '<rootDir>/__mocks__/mockFunction.js',
    '.+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss)$':
      '<rootDir>/__mocks__/mockFunction.js',
    '@root/(.*)': '<rootDir>/src/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
  },
};
