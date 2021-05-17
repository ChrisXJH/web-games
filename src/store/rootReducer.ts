import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import gameReducer from './game/reducer';
import { GAME_DOMAIN, USER_DOMAIN } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  [USER_DOMAIN]: userReducer,
  [GAME_DOMAIN]: gameReducer
});
