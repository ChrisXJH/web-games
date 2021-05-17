/* eslint-disable max-len */
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { gameEvent, joinGameFailure, joinGameSuccess } from '../game/actions';
import type { ServicesAPI, EmitPayload } from '../types';
import { websocketConnect } from './actions';
import {
  WEBSOCKET_EMIT, WEBSOCKET_GAME_EVENT, WEBSOCKET_GAME_JOIN_SUCCESS, WEBSOCKET_GAME_JOIN_FAILURE
} from '../constants';

type WebsocketMiddlewareOptions = {
  api: ServicesAPI;
};

const eventActionMap: { [key: string]: (...args: any[]) => AnyAction } = {
  [WEBSOCKET_GAME_EVENT]: gameEvent,
  [WEBSOCKET_GAME_JOIN_SUCCESS]: joinGameSuccess,
  [WEBSOCKET_GAME_JOIN_FAILURE]: joinGameFailure
};

const handleConnected = (options: WebsocketMiddlewareOptions, store: MiddlewareAPI) => {
  const { api } = options;

  api.websocketService.onAny((event, arg) => {
    const actionCreator = eventActionMap[event];

    if (actionCreator) {
      store.dispatch(actionCreator(arg));
    }
  });
};

const handleEmit = (options: WebsocketMiddlewareOptions, action: PayloadAction<EmitPayload>) => {
  const { api } = options;
  const { payload: { event, args } } = action;

  api.websocketService.emit(event, ...args);
};

const websocketMiddleware = (options: WebsocketMiddlewareOptions): Middleware => (store) => (next) => (action) => {
  const { type } = action;

  switch (type) {
    case websocketConnect.fulfilled.type:
      handleConnected(options, store);
      break;

    case WEBSOCKET_EMIT:
      handleEmit(options, action);
      break;

    default:
      break;
  }

  return next(action);
};

export default websocketMiddleware;
