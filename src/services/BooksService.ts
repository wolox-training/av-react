import api from '~config/api';
import { BooksRequestFail, BooksRequestSucess, BookRequestSuccess, RequestFail } from '~utils/types';

const GET_BOOKS_URL = 'books/';

export const getBooks = () => api.get<BooksRequestSucess, RequestFail>(GET_BOOKS_URL);

export const getBook = (id: number) => api.get<BookRequestSuccess, BooksRequestFail>(`${GET_BOOKS_URL}${id}`);
