import type { Dispatch } from '@reduxjs/toolkit';
import type {
  GameAction, GameID, GameSnapshot, User, UserID
} from '../common/types';
import type GameService from '../services/game-service';
import type UserService from '../services/user-service';
import type WebsocketService from '../services/websocket-service';

export type ServicesAPI = {
  userService: UserService;
  gameService: GameService;
  websocketService: WebsocketService;
};

export interface ThunkApiConfig {
  state?: unknown;
  dispatch?: Dispatch;
  extra: ServicesAPI;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
}

// Game
export type GameEvent = {
  type: string;
  gameId: GameID;
  payload: unknown;
};

export type PlayerJoinEvent = {
  gameId: GameID;
  player: User;
};

export type PlayerLeaveEvent = {
  gameId: GameID;
  playerId: UserID;
};

export type GamePlayEvent = {
  gameId: GameID;
  action: GameAction;
};

export type GameEndEvent = {
  gameId: GameID;
};

export type GameRestartEvent = {
  gameId: GameID;
  snapshot: GameSnapshot;
};

export type GomokuGameWinEvent = {
  gameId: GameID;
  winner: UserID;
};

// Websocket
export type EmitPayload = {
  event: any,
  args: any[]
};
