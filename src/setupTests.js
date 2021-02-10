import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';

import { HANDLERS } from '~config/api/constants';

export const server = setupServer(...HANDLERS);

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: str => str
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
