export type Nullable<T> = T | null;

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  locale?: string;
}

export interface UserRequestSuccess {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
  accessToken: string;
}

export interface UserSignupRequestFail {
  status: string;
  errors: {
    fullMessages: string[];
  };
}

export interface UserLoginRequestFail {
  status: string;
  errors: string[];
}
