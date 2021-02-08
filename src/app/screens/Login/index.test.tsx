import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';

import { server } from '../../../setupTests';

import { OK_LOGIN_API_RESPONSE } from './mocks';

import Login from './';

const MAX_BUTTONS_LENGTH = 2;
const MAX_ALERTS_LENGTH = 2;
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/users/sign_in`;
const STATUS_CREATED = 201;

describe('Login test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(
      <Router>
        <Login />
      </Router>
    );
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render email and password inputs', () => {
    expect(screen.getByLabelText('Login:email')).toBeInTheDocument();
    expect(screen.getByLabelText('Login:password')).toBeInTheDocument();
  });

  test('Should render login and signup buttons', () => {
    expect(screen.getAllByRole('button').length).toBe(MAX_BUTTONS_LENGTH);
  });

  test('Should render required message after submitting form with empty fields', async () => {
    userEvent.click(screen.getByText('Login:login'));
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MAX_ALERTS_LENGTH));
  });

  test('Local storage should be called after sucess login request.', async () => {
    server.use(
      rest.post(`${API_URL}`, (req, res, ctx) =>
        res(ctx.status(STATUS_CREATED), ctx.json(OK_LOGIN_API_RESPONSE))
      )
    );
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    userEvent.type(screen.getByLabelText('Login:email'), 'test123@test.com');
    userEvent.type(screen.getByLabelText('Login:password'), '123456');
    userEvent.click(screen.getByText('Login:login'));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalled());
  });
});
