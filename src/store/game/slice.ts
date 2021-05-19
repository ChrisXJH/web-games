import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'lodash';
import type { Draft } from '@reduxjs/toolkit';
import type { GameSnapshot, GomokuGameAction, GomokuSnapshot } from '../../common/types';
import type {
  GamePlayEvent, PlayerJoinEvent, PlayerLeaveEvent, GameEndEvent, GomokuGameWinEvent
} from '../types';
import { GAME_DOMAIN, GOMOKU } from '../constants';

export type GameState = {
  games: { [id: string]: GameSnapshot };
};

const initialState: GameState = {
  games: {}
};

const gameSlice = createSlice({
  name: GAME_DOMAIN,
  initialState,
  reducers: {
    joinGameSuccess: (state, action: PayloadAction<GameSnapshot>) => {
      const { games } = state;
      const { payload } = action;

      games[payload.gameId] = payload;
    },
    gamePlayEvent: (state, action: PayloadAction<GamePlayEvent>) => {
      const { games } = state;
      const { gameId, action: gameAction } = action.payload;

      if (!games[gameId]) return;

      const { name } = games[gameId];

      switch (name) {
        case GOMOKU: {
          const game = games[gameId] as Draft<GomokuSnapshot>;
          game.actions.push(gameAction as GomokuGameAction);

          break;
        }

        default:
          break;
      }
    },
    playerJoinEvent: (state, action: PayloadAction<PlayerJoinEvent>) => {
      const { games } = state;
      const { gameId, player: newPlayer } = action.payload;

      if (!games[gameId]) return;

      const { players } = games[gameId];

      remove(players, (player) => player.id === newPlayer.id);
      players.push(newPlayer);
    },
    playerLeaveEvent: (state, action: PayloadAction<PlayerLeaveEvent>) => {
      const { games } = state;
      const { gameId, playerId } = action.payload;

      if (!games[gameId]) return;

      const { players } = games[gameId];

      remove(players, (player) => player.id === playerId);
    },
    gameEndEvent: (state, action: PayloadAction<GameEndEvent>) => {
      const { games } = state;
      const { gameId } = action.payload;

      if (!games[gameId]) return;

      games[gameId].ended = true;
    },

    // Gomoku Reducers
    gomokuGameWinEvent: (state, action: PayloadAction<GomokuGameWinEvent>) => {
      const { games } = state;
      const { gameId, winner } = action.payload;

      if (!games[gameId]) return;

      const gomoku = games[gameId] as Draft<GomokuSnapshot>;

      gomoku.winner = winner;
    }
  }
});

export default gameSlice;
