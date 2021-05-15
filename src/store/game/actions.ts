import { createAction } from "@reduxjs/toolkit";
import { GameID, GamePlayEvent, GamePlayRequest, GameSnapshot, User } from "../../common/types";
import { GAME_PLAY, GAME_PLAY_FAILURE, JOIN_GAME, JOIN_GAME_FAILURE, JOIN_GAME_SUCCESS, PLAYER_JOIN, REQUEST_GAME_PLAY, WEBSOCKET_GAME_JOIN, WEBSOCKET_GAME_PLAY } from "../constants";
import { createThunkAction } from "../utils";
import { websocketConnect, websocketEmit } from "../ws/actions";

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

export const joinGameSuccess = createAction(
    JOIN_GAME_SUCCESS,
    (payload: GameSnapshot) => ({ payload })
);

export const joinGameFailure = createAction(JOIN_GAME_FAILURE);

export const requestGamePlay = createThunkAction(
    REQUEST_GAME_PLAY,
    (request: GamePlayRequest, thunkAPI) =>
        thunkAPI.dispatch(websocketEmit(WEBSOCKET_GAME_PLAY, request))
);

export const gamePlay = createAction(
    GAME_PLAY,
    (payload: GamePlayEvent) => ({ payload })
);

export const gamePlayFailure = createAction(
    GAME_PLAY_FAILURE,
    (payload: any) => ({ payload })
);

export const playerJoin = createAction(
    PLAYER_JOIN,
    (payload: User) => ({ payload })
);
