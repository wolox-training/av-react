import api from '~config/api';
import { EDNPOINTS } from '~config/api/constants';

import { UserRequestSuccess, UserLoginRequestFail, UserSignupRequestFail, User } from '../utils/types';

export const signUp = (payload: User) =>
  api.post<UserRequestSuccess, UserSignupRequestFail>(EDNPOINTS.signUp, payload);

export const login = (payload: User) =>
  api.post<UserRequestSuccess, UserLoginRequestFail>(EDNPOINTS.login, payload);
