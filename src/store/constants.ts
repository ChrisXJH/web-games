// Game
export const GAME_DOMAIN = 'game';
export const JOIN_GAME = `${GAME_DOMAIN}/JOIN_GAME`;
export const JOIN_GAME_SUCCESS = `${GAME_DOMAIN}/JOIN_GAME_SUCCESS`;
export const JOIN_GAME_FAILURE = `${GAME_DOMAIN}/JOIN_GAME_FAILURE`;
export const REQUEST_GAME_PLAY = `${GAME_DOMAIN}/REQUEST_GAME_PLAY`;
export const GAME_PLAY = `${GAME_DOMAIN}/GAME_PLAY`;
export const GAME_PLAY_FAILURE = `${GAME_DOMAIN}/GAME_PLAY_FAILURE`;
export const PLAYER_JOIN = `${GAME_DOMAIN}/PLAYER_JOIN`;
export const GAME_EVENT = `${GAME_DOMAIN}/GAME_EVENT`;

export const PLAYER_JOIN_EVENT = 'PLAYER_JOIN';
export const GAME_PLAY_EVENT = 'GAME_PLAY';

// User
export const USER_DOMAIN = 'user';
export const GET_USER = `${USER_DOMAIN}/getUser`;
export const UPDATE_USERNAME = `${USER_DOMAIN}/updateUsername`;
export const UPDATE_USERNAME_AND_START_GAME = `${USER_DOMAIN}/updateUsernameAndStartGame`;

// Websocket
export const WEBSOCKET_DOMAIN = 'ws';
export const WEBSOCKET_CONNECT = `${WEBSOCKET_DOMAIN}/CONNECT`;
export const WEBSOCKET_EMIT = `${WEBSOCKET_DOMAIN}/EMIT`;

export const WEBSOCKET_GAME_EVENT = 'GAME_EVENT';

export const WEBSOCKET_GAME_JOIN = 'GAME_JOIN';
export const WEBSOCKET_GAME_JOIN_SUCCESS = 'GAME_JOIN_SUCCESS';

export const WEBSOCKET_GAME_PLAY = 'GAME_PLAY';
