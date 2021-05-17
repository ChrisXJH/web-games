/* eslint-disable import/prefer-default-export */
import type { RootState } from '..';
import { GAME_DOMAIN } from '../constants';
import type { GameState } from './slice';

export const selectGame = (state: RootState): GameState => state[GAME_DOMAIN];
