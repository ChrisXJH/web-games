import { createAction } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';
import type { GameAction, User, UserID } from '../../common/types';
import type { GameEvent } from '../types';
import {
  GAME_EVENT, GAME_PLAY_EVENT, JOIN_GAME_FAILURE,
  PLAYER_JOIN_EVENT, PLAYER_LEAVE_EVENT, GAME_END_EVENT
} from '../constants';
import gameSlice from './slice';

export const {
  joinGameSuccess, gamePlayEvent, playerJoinEvent, playerLeaveEvent, gameEndEvent
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

    default:
      break;
  }

  return defaultGameEvent(event);
};

export * from './thunks';
