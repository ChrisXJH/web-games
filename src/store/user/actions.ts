import { selectUser } from ".";
import { RootState } from "..";
import { createThunkAction } from "../utils";
import { GET_USER, UPDATE_USERNAME, UPDATE_USERNAME_AND_START_GAME } from "../constants";
import { push } from "connected-react-router";
import { GOMOKU_PATH } from "../../common/constants";
import { GameSnapshot } from "../../common/types";

export const getUser = createThunkAction(
    GET_USER,
    (_, thunkAPI) => thunkAPI.extra.userService.getUser()
);

const updateUsername = createThunkAction(
    UPDATE_USERNAME,
    (_, thunkApi) => {
        const state = thunkApi.getState() as RootState;
        const { displayName } = selectUser(state);

        if (!displayName) {
            return thunkApi.rejectWithValue("Invalid name");
        }

        return thunkApi.extra.userService.setUser({ displayName });
    }
);

export const updateUsernameAndStartGame = createThunkAction(
    UPDATE_USERNAME_AND_START_GAME,
    (_, thunkApi) => thunkApi.dispatch(updateUsername(null)).then(
        () => thunkApi.extra.gameService.createGame().then(
            (snapshot: GameSnapshot) => thunkApi.dispatch(push(`${GOMOKU_PATH}/${snapshot.gameId}`))
        )
    )
);
