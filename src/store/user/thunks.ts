import { push } from 'connected-react-router';
import type { RootState } from '..';
import type { GameID, GameSnapshot } from '../../common/types';
import { GOMOKU_PATH } from '../../common/constants';
import {
  GET_USER, UPDATE_USERNAME, UPDATE_USERNAME_AND_START_GAME, UPDATE_USERNAME_AND_JOIN_GAME
} from '../constants';
import { createThunkAction } from '../utils';

export const getUser = createThunkAction(
  GET_USER,
  (_, thunkAPI) => thunkAPI.extra.userService.getUser()
);

export const updateUsername = createThunkAction(
  UPDATE_USERNAME,
  (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { displayName } = state.user;

    if (!displayName) {
      return thunkAPI.rejectWithValue('Invalid name');
    }

    return thunkAPI.extra.userService.setUser({ displayName });
  }
);

export const updateUsernameAndStartGame = createThunkAction(
  UPDATE_USERNAME_AND_START_GAME,
  (_, thunkAPI) => thunkAPI.dispatch(updateUsername(null)).then(
    () => thunkAPI.extra.gameService.createGame().then(
      (snapshot: GameSnapshot) => thunkAPI.dispatch(push(`${GOMOKU_PATH}/${snapshot.gameId}`))
    )
  )
);

export const updateUsernameAndJoinGame = createThunkAction(
  UPDATE_USERNAME_AND_JOIN_GAME,
  (gameId: GameID, thunkAPI) => thunkAPI.dispatch(updateUsername(null)).then(
    () => thunkAPI.dispatch(push(`${GOMOKU_PATH}/${gameId}`))
  )
);
