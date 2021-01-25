import { SignupSuccess, SignupError, User } from '../typings/user';
import { SING_UP_URL } from '../constants';
import api from '../config/api';

export const signUp = (payload: User) => api.post<SignupSuccess, SignupError>(SING_UP_URL, payload);
