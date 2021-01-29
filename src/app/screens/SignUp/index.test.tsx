import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
<<<<<<< HEAD
import '@testing-library/jest-dom';
=======
>>>>>>> main

import SignUp from './';

const FORM_FIELDS_AMOUNT = 5;
const MAX_FORM_FIELDS_ERRORS = 5;
const MINIMUM_ALERT_LENGTH = 1;
const FORM_BUTTONS_AMOUNT = 2;
const PASSWORD = 'test';
const WRONG_CONFIRM_PASSWORD = 'wrongPassword';

describe('Signup test', () => {
  test('Should match snapshot', () => {
    const { container } = render(<SignUp />);
    expect(container).toMatchSnapshot();
  });

  test('Should render 5 form inputs', () => {
    const { container } = render(<SignUp />);
    expect(container.querySelectorAll('input').length).toBe(FORM_FIELDS_AMOUNT);
  });

  test('Should render 2 buttons', () => {
    render(<SignUp />);
    expect(screen.getAllByRole('button')).toHaveLength(FORM_BUTTONS_AMOUNT);
  });

  test('Wolox logo should be render and contain alt text', () => {
    render(<SignUp />);
    expect(screen.getByAltText('SignUp:logoAlt')).toBeInTheDocument();
  });

  test('Should render email error message', async () => {
    render(<SignUp />);
    userEvent.type(screen.getByLabelText('SignUp:email'), PASSWORD);
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MINIMUM_ALERT_LENGTH));
  });

  test('Should render required message for form fields', async () => {
    render(<SignUp />);
    fireEvent.click(screen.getByText('SignUp:signUp'));
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(MAX_FORM_FIELDS_ERRORS));
  });

  test('Should render password match error', async () => {
    render(<SignUp />);
    userEvent.type(screen.getByLabelText('SignUp:password'), PASSWORD);
    userEvent.type(screen.getByLabelText('SignUp:confirmPassword'), WRONG_CONFIRM_PASSWORD);
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBe(1));
  });
});
