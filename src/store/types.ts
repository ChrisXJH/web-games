import { Dispatch } from '@reduxjs/toolkit';
import GameService from '../services/game-service';
import UserService from '../services/user-service';
import WebsocketService from '../services/websocket-service';

export type ServicesAPI = {
  userService: UserService;
  gameService: GameService;
  websocketService: WebsocketService;
};

export interface ThunkApiConfig {
  state?: unknown;
  dispatch?: Dispatch;
  extra: ServicesAPI;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
}
