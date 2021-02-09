import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { BASE_URL, LOGIN_URL } from '~config/api/constants';
import { OK_LOGIN_API_RESPONSE } from '~app/screens/Login/mocks';

const STATUS_CREATED = 201;

export const server = setupServer(
  rest.post(`${BASE_URL}${LOGIN_URL}`, (req, res, ctx) =>
    res(ctx.status(STATUS_CREATED), ctx.json(OK_LOGIN_API_RESPONSE))
  )
);

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: str => str
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
