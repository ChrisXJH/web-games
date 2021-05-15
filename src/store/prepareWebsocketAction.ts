import { WEBSOCKET_GAME_JOIN_FAILURE, WEBSOCKET_GAME_JOIN_SUCCESS, WEBSOCKET_GAME_PLAY, WEBSOCKET_GAME_PLAY_FAILURE, WEBSOCKET_PLAYER_JOIN } from "./constants";
import { gamePlay, gamePlayFailure, joinGameFailure, joinGameSuccess, playerJoin } from "./game/actions";
import { ActionPreparer } from "./ws/types";

const prepareWebsocketAction: ActionPreparer = (prepareDefaultAction, ...args) => {
    const [event, ...eventArgs] = args;

    switch(event) {
        case WEBSOCKET_GAME_JOIN_SUCCESS:
            return joinGameSuccess(eventArgs[0]);
        case WEBSOCKET_GAME_JOIN_FAILURE:
            return joinGameFailure();
        case WEBSOCKET_PLAYER_JOIN:
            return playerJoin(eventArgs[0]);
        case WEBSOCKET_GAME_PLAY:
            return gamePlay(eventArgs[0]);
        case WEBSOCKET_GAME_PLAY_FAILURE:
            return gamePlayFailure(eventArgs[0]);
        default:
            break;
    }

    return prepareDefaultAction(...args);
};

export default prepareWebsocketAction;
