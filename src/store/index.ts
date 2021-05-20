import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { SERVER_URL } from '../configs/config';
import GameService from '../services/game-service';
import HttpService from '../services/http-service';
import UserService from '../services/user-service';
// eslint-disable-next-line import/no-cycle
import { createRootReducer } from './rootReducer';
import type { ServicesAPI } from './types';
import WebsocketService from '../services/websocket-service';
import websocketMiddleware from './ws/middleware';

const httpService = new HttpService(SERVER_URL);
const websocketService = new WebsocketService(SERVER_URL);

const servicesAPI: ServicesAPI = {
  userService: new UserService(httpService),
  gameService: new GameService(httpService),
  websocketService
};

export const history = process.env.NODE_ENV === 'production'
  ? createBrowserHistory({ basename: '/web-games' })
  : createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      thunk: { extraArgument: servicesAPI }
    });

    return defaultMiddleware
      .concat(routerMiddleware(history))
      .concat(websocketMiddleware({
        api: servicesAPI
      }));
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
