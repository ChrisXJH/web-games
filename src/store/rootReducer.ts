import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { GAME_DOMAIN, USER_DOMAIN } from "./constants";
import { userReducer } from "./user";
import { gameReducer } from "./game";

export const createRootReducer = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        [USER_DOMAIN]: userReducer,
        [GAME_DOMAIN]: gameReducer
    });
