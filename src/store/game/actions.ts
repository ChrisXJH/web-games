import { createAction } from '@reduxjs/toolkit';
import type { GamePlayEvent, GameSnapshot, User } from '../../common/types';
import {
  GAME_PLAY, GAME_PLAY_FAILURE, JOIN_GAME_FAILURE, JOIN_GAME_SUCCESS, PLAYER_JOIN
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
  (payload: User) => ({ payload })
);
