import { SignupSuccess, SignupError, User } from '../utils/types';
import api from '../config/api';

const SING_UP_URL = 'users';

export const signUp = (payload: User) => api.post<SignupSuccess, SignupError>(SING_UP_URL, payload);
