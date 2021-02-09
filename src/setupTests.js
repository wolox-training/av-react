import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { OK_LOGIN_API_RESPONSE } from '~app/screens/Login/mocks';

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;
const SIGN_IN_URL = '/users/sign_in';
const STATUS_CREATED = 201;

export const server = setupServer(
  rest.post(`${BASE_API_URL}${SIGN_IN_URL}`, (req, res, ctx) =>
    res(ctx.status(STATUS_CREATED), ctx.json(OK_LOGIN_API_RESPONSE))
  )
);

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: str => str
}));

beforeAll(() => {
  server.listen();
});

afterAll(() => server.close());
