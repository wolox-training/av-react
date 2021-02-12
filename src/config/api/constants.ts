import { rest } from 'msw';

import { OK_BOOKS_API_RESPONSE } from '~screens/Home/components/BookList/mocks';
import { OK_LOGIN_API_RESPONSE } from '~screens/Login/mocks';

export const EDNPOINTS = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  login: '/users/sign_in',
  signUp: '/users',
  books: '/books'
};
export const STATUS_CODE = {
  created: 201,
  ok: 200
};
export const HANDLERS = [
  rest.post(`${EDNPOINTS.baseUrl}${EDNPOINTS.login}`, (req, res, ctx) =>
    res(ctx.status(STATUS_CODE.created), ctx.json(OK_LOGIN_API_RESPONSE))
  ),

  rest.get(`${EDNPOINTS.baseUrl}${EDNPOINTS.books}`, (req, res, ctx) =>
    res(ctx.json(STATUS_CODE.ok), ctx.json(OK_BOOKS_API_RESPONSE))
  )
];
export const TOKEN_KEY = 'access-token';
export const CLIENT_KEY = 'client';
export const UID_KEY = 'uid';
