// eslint-disable-next-line import/prefer-default-export
export const SERVER_URL = process.env.NODE_ENV === 'production'
  ? 'https://the-online-games.herokuapp.com/'
  : 'http://localhost:8080';
