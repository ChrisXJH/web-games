import type { RootState } from '..';
import type { UserState } from './slice';
import { USER_DOMAIN } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const selectUser = (state: RootState): UserState => state[USER_DOMAIN];
