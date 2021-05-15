import { configureStore } from "@reduxjs/toolkit";
import { SERVER_URL } from "../configs/config";
import GameService from "../services/game-service";
import HttpService from "../services/http-service";
import UserService from "../services/user-service";
import { createRootReducer } from "./rootReducer";
import { ServicesAPI } from "./types";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from "connected-react-router";
import WebsocketService from "../services/websocket-service";
import { websocketMiddleware } from "./ws/middleware";
import prepareWebsocketAction from "./prepareWebsocketAction";

const httpService = new HttpService(SERVER_URL);
const websocketService = new WebsocketService(SERVER_URL);

const servicesAPI: ServicesAPI = {
    userService: new UserService(httpService),
    gameService: new GameService(httpService),
    websocketService
};

export const history = createBrowserHistory();

const store = configureStore({
    reducer: createRootReducer(history),
    middleware: getDefaultMiddleware => {
        const defaultMiddleware = getDefaultMiddleware({
            thunk: { extraArgument: servicesAPI }
        });

        return defaultMiddleware
            .concat(routerMiddleware(history))
            .concat(websocketMiddleware({
                api: servicesAPI,
                prepareAction: prepareWebsocketAction
            }));
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
