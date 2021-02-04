import { ApiOkResponse } from 'apisauce';

import { UserRequestSuccess, User, UserSignupRequestFail, UserLoginRequestFail } from '../utils/types';
import api from '../config/api';
import { SING_UP_URL, LOGIN_URL } from '../utils/constants';

export const signUp = (payload: User) =>
  api.post<ApiOkResponse<UserRequestSuccess>, UserSignupRequestFail>(SING_UP_URL, payload);

export const login = (payload: User) =>
  api.post<ApiOkResponse<UserRequestSuccess>, UserLoginRequestFail>(LOGIN_URL, payload);
