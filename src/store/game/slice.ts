import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GamePlayEvent, GameSnapshot, GomokuGameAction, GomokuSnapshot, User
} from '../../common/types';
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
      const { payload: { playerId, action: gameAction } } = action;
      const { x, y } = gameAction as GomokuGameAction;
      const { grid } = state.snapshot as GomokuSnapshot;

      grid.push([playerId, x, y]);
    },
    [PLAYER_JOIN]: (state, action: PayloadAction<User>) => {
      state.snapshot.players.push(action.payload);
    }
  }
});

export default gameSlice;
