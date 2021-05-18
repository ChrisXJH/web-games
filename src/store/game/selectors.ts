/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import type { RootState } from '..';
import type { GameID } from '../../common/types';
import { GAME_DOMAIN } from '../constants';
import type { GameState } from './slice';

const selectGameDomain = (state: RootState): GameState => state[GAME_DOMAIN];

const selectGames = createSelector(
  selectGameDomain,
  (state) => state.games
);

export const selectGameById = (gameId: GameID) => createSelector(
  selectGames,
  (state) => state[gameId]
);
