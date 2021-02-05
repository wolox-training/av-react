import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';

import { OK_LOGIN_API_RESPONSE } from './mocks';

import Login from './';

const MAX_BUTTONS_LENGTH = 2;
const MAX_ALERTS_LENGTH = 2;
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/users/sign_in`;
const STATUS_CREATED = 201;
const server = setupServer(
  rest.post(`${API_URL}`, (req, res, ctx) => res(ctx.status(STATUS_CREATED), ctx.json(OK_LOGIN_API_RESPONSE)))
);

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Login test', () => {
  test('Should match snapshot', () => {
    const { container } = render(
      <Router>
        <Login />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render email and password inputs', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByLabelText('Login:email')).toBeInTheDocument();
    expect(screen.getByLabelText('Login:password')).toBeInTheDocument();
  });

  test('Should render login and signup buttons', () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getAllByRole('button').length).toBe(MAX_BUTTONS_LENGTH);
  });

  test('Should render required message after submitting form with empty fields', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    userEvent.click(screen.getByText('Login:login'));
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MAX_ALERTS_LENGTH));
  });

  test('Local storage should be called after sucess login request.', async () => {
    server.listen();
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    render(
      <Router>
        <Login />
      </Router>
    );
    userEvent.type(screen.getByLabelText('Login:email'), 'test123@test.com');
    userEvent.type(screen.getByLabelText('Login:password'), '123456');

    userEvent.click(screen.getByText('Login:login'));

    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalled());
  });
});
