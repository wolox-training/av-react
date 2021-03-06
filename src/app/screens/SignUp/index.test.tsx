import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import SignUp from './';

const FORM_FIELDS_AMOUNT = 5;
const MAX_FORM_FIELDS_ERRORS = 5;
const MINIMUM_ALERT_LENGTH = 1;
const FORM_BUTTONS_AMOUNT = 2;
const PASSWORD = 'test';
const WRONG_CONFIRM_PASSWORD = 'wrongPassword';

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
});
