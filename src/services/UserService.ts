import { UserRequestSuccess, UserLoginRequestFail, UserSignupRequestFail, User } from '../utils/types';
import api from '../config/api';

const SING_UP_URL = 'users';
const LOGIN_URL = 'users/sign_in';

export const signUp = (payload: User) =>
  api.post<UserRequestSuccess, UserSignupRequestFail>(SING_UP_URL, payload);

export const login = (payload: User) =>
  api.post<UserRequestSuccess, UserLoginRequestFail>(LOGIN_URL, payload);
