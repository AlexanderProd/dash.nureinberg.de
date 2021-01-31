export const apiEndpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://api.nureinberg.de'
    : 'http://localhost:3000';

export * from './getCookie';
