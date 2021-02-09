import api from '~config/api';
import { SING_UP_URL, LOGIN_URL } from '~config/api/constants';

import { UserRequestSuccess, UserLoginRequestFail, UserSignupRequestFail, User } from '../utils/types';

export const signUp = (payload: User) =>
  api.post<UserRequestSuccess, UserSignupRequestFail>(SING_UP_URL, payload);

export const login = (payload: User) =>
  api.post<UserRequestSuccess, UserLoginRequestFail>(LOGIN_URL, payload);
