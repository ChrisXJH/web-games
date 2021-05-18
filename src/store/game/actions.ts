import { createAction } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import type {
  GameAction, GameSnapshot, User, UserID
} from '../../common/types';
import type {
  GameEndEvent,
  GameEvent, GamePlayEvent, PlayerJoinEvent, PlayerLeaveEvent
} from '../types';
import {
  GAME_EVENT, GAME_PLAY, GAME_PLAY_EVENT, GAME_PLAY_FAILURE, JOIN_GAME_FAILURE,
  JOIN_GAME_SUCCESS, PLAYER_JOIN, PLAYER_LEAVE, PLAYER_JOIN_EVENT, PLAYER_LEAVE_EVENT,
  GAME_END, GAME_END_EVENT
} from '../constants';

export const joinGameSuccess = createAction(
  JOIN_GAME_SUCCESS,
  (payload: GameSnapshot) => ({ payload })
);

export const joinGameFailure = createAction(JOIN_GAME_FAILURE);

export const gamePlay = createAction(
  GAME_PLAY,
  (payload: GamePlayEvent) => ({ payload })
);

export const gamePlayFailure = createAction(
  GAME_PLAY_FAILURE,
  (payload: any) => ({ payload })
);

export const playerJoin = createAction(
  PLAYER_JOIN,
  (payload: PlayerJoinEvent) => ({ payload })
);

export const playerLeave = createAction(
  PLAYER_LEAVE,
  (payload: PlayerLeaveEvent) => ({ payload })
);

export const gameEnd = createAction(
  GAME_END,
  (payload: GameEndEvent) => ({ payload })
);

const defaultGameEvent = createAction(
  GAME_EVENT,
  (payload: GameEvent) => ({ payload })
);

export const gameEvent = (event: GameEvent): AnyAction => {
  const { type, gameId, payload } = event;

  switch (type) {
    case PLAYER_JOIN_EVENT:
      return playerJoin({ gameId, player: payload as User });

    case PLAYER_LEAVE_EVENT:
      return playerLeave({ gameId, playerId: payload as UserID });

    case GAME_PLAY_EVENT:
      return gamePlay({ gameId, action: payload as GameAction });

    case GAME_END_EVENT:
      return gameEnd({ gameId });

    default:
      break;
  }

  return defaultGameEvent(event);
};

export * from './thunks';
