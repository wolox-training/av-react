import api from '~config/api';
import { BooksRequestFail, BooksRequestSucess, BookSuccess, RequestFail } from '~utils/types';

const GET_BOOKS_URL = 'books/';

export const getBooks = () => api.get<BooksRequestSucess, RequestFail>(GET_BOOKS_URL);

export const getBook = (payload: number) =>
  api.get<BookSuccess, BooksRequestFail>(`${GET_BOOKS_URL}${payload}`);
