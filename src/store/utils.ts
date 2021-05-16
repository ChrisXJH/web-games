/* eslint-disable import/prefer-default-export */
import { AsyncThunk, AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApiConfig } from './types';

export const createThunkAction = <Returned, ThunkArg = any>(
  type: string,
  thunk: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
): AsyncThunk<Returned, ThunkArg, ThunkApiConfig> => createAsyncThunk(type, thunk);
