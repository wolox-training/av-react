import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './';

const MAX_BUTTONS_LENGTH = 2;
const MAX_ALERTS_LENGTH = 2;

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
});
