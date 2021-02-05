import api from '~config/api';
import { CLIENT_KEY, TOKEN_KEY, UID_KEY } from '~utils/constants';
import { BooksRequestSucess, BooksRequestFail } from '~utils/types';

import LocalStorageService from './LocalStorageService';

const GET_BOOKS_URL = 'books';
const HEADERS = {
  [TOKEN_KEY]: LocalStorageService.getValue(TOKEN_KEY),
  client: LocalStorageService.getValue(CLIENT_KEY),
  uid: LocalStorageService.getValue(UID_KEY)
};

export const getBooks = () => {
  api.setHeaders(HEADERS);
  return api.get<BooksRequestSucess, BooksRequestFail>(GET_BOOKS_URL);
};
