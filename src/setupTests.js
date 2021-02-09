import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { EDNPOINTS, STATUS_CODE } from '~config/api/constants';
import { OK_LOGIN_API_RESPONSE } from '~app/screens/Login/mocks';

export const server = setupServer(
  rest.post(`${EDNPOINTS.baseUrl}${EDNPOINTS.login}`, (req, res, ctx) =>
    res(ctx.status(STATUS_CODE.created), ctx.json(OK_LOGIN_API_RESPONSE))
  )
);

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: str => str
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
