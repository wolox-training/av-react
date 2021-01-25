export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  locale?: string;
}

export interface SignupSuccess {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
}

export interface SignupError {
  status: string;
  errors: {
    fullMessages: string[];
  };
}
