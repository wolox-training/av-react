import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactWrapper } from 'enzyme';

import { OK_SIGNUP_API_RESPONSE } from './mocks';

import SignUp from './';

const FORM_FIELDS_AMOUNT = 5;
const MAX_FORM_FIELDS_ERRORS = 5;
const MINIMUM_ALERT_LENGTH = 1;
const FORM_BUTTONS_AMOUNT = 2;
const PASSWORD = 'test';
const WRONG_CONFIRM_PASSWORD = 'wrongPassword';
const API_URL = `${process.env.REACT_APP_API_BASE_URL}/users`;
const STATUS_CREATED = 201;

const server = setupServer(
  rest.post(`${API_URL}`, (req, res, ctx) =>
    res(ctx.status(STATUS_CREATED), ctx.json(OK_SIGNUP_API_RESPONSE))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Signup test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(
      <Router>
        <SignUp />
      </Router>
    );
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render 5 form inputs', () => {
    expect(container?.querySelectorAll('input').length).toBe(FORM_FIELDS_AMOUNT);
  });

  test('Should render 2 buttons', () => {
    expect(screen.getAllByRole('button')).toHaveLength(FORM_BUTTONS_AMOUNT);
  });

  test('Wolox logo should be render and contain alt text', () => {
    expect(screen.getByAltText('SignUp:logoAlt')).toBeInTheDocument();
  });

  test('Should render email error message', async () => {
    userEvent.type(screen.getByLabelText('SignUp:email'), PASSWORD);
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MINIMUM_ALERT_LENGTH));
  });

  test('Should render required message for form fields', async () => {
    fireEvent.click(screen.getByText('SignUp:signUp'));
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MAX_FORM_FIELDS_ERRORS));
  });

  test('Should render password match error', async () => {
    userEvent.type(screen.getByLabelText('SignUp:password'), PASSWORD);
    userEvent.type(screen.getByLabelText('SignUp:confirmPassword'), WRONG_CONFIRM_PASSWORD);
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MINIMUM_ALERT_LENGTH));
  });

  test('Local storage should be called after sucess signup request.', async () => {
    // eslint-disable-next-line no-proto
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    userEvent.type(screen.getByLabelText('SignUp:firstName'), 'test');
    userEvent.type(screen.getByLabelText('SignUp:lastName'), 'test');
    userEvent.type(screen.getByLabelText('SignUp:email'), 'test123@test.com');
    userEvent.type(screen.getByLabelText('SignUp:password'), '123456');
    userEvent.type(screen.getByLabelText('SignUp:confirmPassword'), '123456');

    userEvent.click(screen.getByText('SignUp:signUp'));

    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalled());
    server.resetHandlers();
    server.close();
  });
});
