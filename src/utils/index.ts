export const apiEndpoint =
  process.env.NODE_ENV === 'production'
    ? 'https://nureinberg-bestand-api.alexanderhoerl.de'
    : 'http://localhost:3000';
