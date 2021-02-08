import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';

export const server = setupServer();

configure({ adapter: new Adapter() });

jest.mock('i18next', () => ({
  t: str => str
}));

beforeAll(() => {
  server.listen();
});

afterAll(() => server.close());
