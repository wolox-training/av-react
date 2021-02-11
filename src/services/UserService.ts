import api from '~config/api';
import { EDNPOINTS } from '~config/api/constants';

import { UserRequestSuccess, UserLoginRequestFail, RequestFail, User } from '../utils/types';

export const signUp = (payload: User) => api.post<UserRequestSuccess, RequestFail>(EDNPOINTS.signUp, payload);

export const login = (payload: User) =>
  api.post<UserRequestSuccess, UserLoginRequestFail>(EDNPOINTS.login, payload);
