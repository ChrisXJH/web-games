import { createAction } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import type { GameAction, GameSnapshot, User } from '../../common/types';
import type { GameEvent, GamePlayEvent, PlayerJoinEvent } from '../types';
import {
  GAME_EVENT, GAME_PLAY, GAME_PLAY_EVENT, GAME_PLAY_FAILURE, JOIN_GAME_FAILURE,
  JOIN_GAME_SUCCESS, PLAYER_JOIN, PLAYER_JOIN_EVENT
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

const defaultGameEvent = createAction(
  GAME_EVENT,
  (payload: GameEvent) => ({ payload })
);

export const gameEvent = (event: GameEvent): AnyAction => {
  const { type, gameId, payload } = event;

  switch (type) {
    case PLAYER_JOIN_EVENT:
      return playerJoin({ gameId, player: payload as User });

    case GAME_PLAY_EVENT:
      return gamePlay({ gameId, action: payload as GameAction });

    default:
      break;
  }

  return defaultGameEvent(event);
};

export * from './thunks';
