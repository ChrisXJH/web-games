import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import type {
  GameSnapshot, GomokuGameAction, GomokuSnapshot
} from '../../common/types';
import type { GamePlayEvent, PlayerJoinEvent } from '../types';
import {
  GAME_DOMAIN, GAME_PLAY, JOIN_GAME_SUCCESS, PLAYER_JOIN
} from '../constants';

export type GameState = {
  snapshot: GameSnapshot;
};

const initialState: GameState = {
  snapshot: {
    gameId: '',
    players: []
  }
};

const gameSlice = createSlice({
  name: GAME_DOMAIN,
  initialState,
  reducers: {},
  extraReducers: {
    [JOIN_GAME_SUCCESS]: (state, action: PayloadAction<GameSnapshot>) => {
      state.snapshot = action.payload;
    },
    [GAME_PLAY]: (state, action: PayloadAction<GamePlayEvent>) => {
      // Gomoku-only for now
      const { action: gameAction } = action.payload;
      const { actions } = state.snapshot as GomokuSnapshot;

      actions.push(gameAction as GomokuGameAction);
    },
    [PLAYER_JOIN]: (state, action: PayloadAction<PlayerJoinEvent>) => {
      const { players } = state.snapshot;
      const { player: newPlayer } = action.payload;

      remove(players, (player) => player.id === newPlayer.id);
      players.push(newPlayer);
    }
  }
});

export default gameSlice;
