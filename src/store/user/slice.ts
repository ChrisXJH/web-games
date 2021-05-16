import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUser, updateUsernameAndStartGame } from './thunks';
import { USER_DOMAIN } from '../constants';

export type UserState = {
  id: string | null;
  displayName: string | null;
};

const initialState: UserState = {
  id: null,
  displayName: null
};

const userSlice = createSlice({
  name: USER_DOMAIN,
  initialState,
  reducers: {
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, () => initialState);
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.displayName = action.payload.displayName;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.error(action.payload); // TODO: implement better error handling
    });

    builder.addCase(updateUsernameAndStartGame.rejected, (state, action) => {
      console.error(action.payload); // TODO: implement better error handling
    });
  }
});

export default userSlice;
