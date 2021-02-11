import api from '~config/api';
import { BooksRequestSucess, RequestFail } from '~utils/types';

const GET_BOOKS_URL = 'books';

export const getBooks = () => api.get<BooksRequestSucess, RequestFail>(GET_BOOKS_URL);
