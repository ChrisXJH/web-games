/* eslint-disable import/prefer-default-export */
import type { RootState } from '..';
import type { GameState } from './slice';
import { GAME_DOMAIN } from '../constants';

export const selectGame = (state: RootState): GameState => state[GAME_DOMAIN];
