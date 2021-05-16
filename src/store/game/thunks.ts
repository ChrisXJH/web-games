import type { GameID, GamePlayRequest } from '../../common/types';
import {
  JOIN_GAME, REQUEST_GAME_PLAY, WEBSOCKET_GAME_JOIN, WEBSOCKET_GAME_PLAY
} from '../constants';
import { createThunkAction } from '../utils';
import { websocketConnect, websocketEmit } from '../ws/actions';

export const joinGame = createThunkAction(
  JOIN_GAME,
  (gameId: GameID, thunkAPI) => {
    const { websocketService } = thunkAPI.extra;

    return thunkAPI.dispatch(websocketConnect(null)).then(
      () => {
        websocketService.emit(WEBSOCKET_GAME_JOIN, { gameId });
      }
    );
  }
);

export const requestGamePlay = createThunkAction(
  REQUEST_GAME_PLAY,
  (request: GamePlayRequest, thunkAPI) => thunkAPI
    .dispatch(websocketEmit(WEBSOCKET_GAME_PLAY, request))
);
