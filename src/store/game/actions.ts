import { createAction } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import type {
  GameAction, GameSnapshot, User, UserID
} from '../../common/types';
import type { GameEvent } from '../types';
import {
  GAME_EVENT, GAME_PLAY_EVENT, JOIN_GAME_FAILURE,
  PLAYER_JOIN_EVENT, PLAYER_LEAVE_EVENT, GAME_END_EVENT, GOMOKU_GAME_WIN_EVENT,
  GAME_RESTART_EVENT
} from '../constants';
import gameSlice from './slice';

export const {
  joinGameSuccess, gamePlayEvent, playerJoinEvent, playerLeaveEvent, gameEndEvent,
  gameRestartEvent, gomokuGameWinEvent
} = gameSlice.actions;

export const joinGameFailure = createAction(JOIN_GAME_FAILURE);

const defaultGameEvent = createAction(
  GAME_EVENT,
  (payload: GameEvent) => ({ payload })
);

export const gameEvent = (event: GameEvent): AnyAction => {
  const { type, gameId, payload } = event;

  switch (type) {
    case PLAYER_JOIN_EVENT:
      return playerJoinEvent({ gameId, player: payload as User });

    case PLAYER_LEAVE_EVENT:
      return playerLeaveEvent({ gameId, playerId: payload as UserID });

    case GAME_PLAY_EVENT:
      return gamePlayEvent({ gameId, action: payload as GameAction });

    case GAME_END_EVENT:
      return gameEndEvent({ gameId });

    case GAME_RESTART_EVENT:
      return gameRestartEvent({ gameId, snapshot: payload as GameSnapshot });

    // Gomoku Events
    case GOMOKU_GAME_WIN_EVENT:
      return gomokuGameWinEvent({ gameId, winner: payload as UserID });

    default:
      break;
  }

  return defaultGameEvent(event);
};

export * from './thunks';
