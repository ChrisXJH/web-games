// Game
export const GAME_DOMAIN = 'game';
export const JOIN_GAME = `${GAME_DOMAIN}/JOIN_GAME`;
export const JOIN_GAME_FAILURE = `${GAME_DOMAIN}/JOIN_GAME_FAILURE`;
export const REQUEST_GAME_PLAY = `${GAME_DOMAIN}/REQUEST_GAME_PLAY`;
export const REQUEST_GAME_RESTART = `${GAME_DOMAIN}/REQUEST_GAME_RESTART`;
export const GAME_PLAY_FAILURE = `${GAME_DOMAIN}/GAME_PLAY_FAILURE`;
export const GAME_EVENT = `${GAME_DOMAIN}/GAME_EVENT`;

export const GOMOKU = 'gomoku';

export const PLAYER_JOIN_EVENT = 'PLAYER_JOIN';
export const PLAYER_LEAVE_EVENT = 'PLAYER_LEAVE';
export const GAME_PLAY_EVENT = 'GAME_PLAY';
export const GAME_END_EVENT = 'GAME_END';
export const GAME_RESTART_EVENT = 'GAME_RESTART';
export const GOMOKU_GAME_WIN_EVENT = 'GOMOKU_GAME_WIN';

// User
export const USER_DOMAIN = 'user';
export const GET_USER = `${USER_DOMAIN}/getUser`;
export const UPDATE_USERNAME = `${USER_DOMAIN}/updateUsername`;
export const UPDATE_USERNAME_AND_START_GAME = `${USER_DOMAIN}/updateUsernameAndStartGame`;
export const UPDATE_USERNAME_AND_JOIN_GAME = `${USER_DOMAIN}/updateUsernameAndJOINGame`;

// Websocket
export const WEBSOCKET_DOMAIN = 'ws';
export const WEBSOCKET_CONNECT = `${WEBSOCKET_DOMAIN}/CONNECT`;
export const WEBSOCKET_EMIT = `${WEBSOCKET_DOMAIN}/EMIT`;

export const WEBSOCKET_GAME_EVENT = 'GAME_EVENT';

export const WEBSOCKET_GAME_JOIN = 'GAME_JOIN';
export const WEBSOCKET_GAME_JOIN_SUCCESS = 'GAME_JOIN_SUCCESS';
export const WEBSOCKET_GAME_JOIN_FAILURE = 'GAME_JOIN_FAILURE';

export const WEBSOCKET_GAME_PLAY = 'GAME_PLAY';

export const WEBSOCKET_GAME_RESTART = 'GAME_RESTART';
