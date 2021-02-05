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
  client: string;
  uid: string;
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

export interface Books {
  id: number;
  author: string;
  title: string;
  imageUrl: string;
  publisher: string;
  year: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface BooksRequestFail {
  status: string;
  errors: {
    fullMessages: string[];
  };
}

export interface BooksRequestSucess {
  count: number;
  currentPage: number;
  nextPage: number;
  page: Books[];
  totalCount: number;
  totalPages: number;
}

export interface BookSuccess {
  id: number;
  author: string;
  title: string;
  imageUrl: string;
  editor: string;
  year: string;
  genre: string;
  currentRent: boolean;
}
