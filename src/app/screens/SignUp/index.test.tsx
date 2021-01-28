import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor } from '@testing-library/react';
import i18next from 'i18next';
import userEvent from '@testing-library/user-event';

import { SIGN_UP_FIELDS } from './constants';

import SignUp from './';

const FORM_FIELDS_AMOUNT = 5;
const MAX_FORM_FIELDS_ERRORS = 5;
const FORM_BUTTONS_AMOUNT = 2;
const WOLOX_LOGO_ALT_TEXT = i18next.t('SignUp:logoAlt');
const INVALID_EMAIL = i18next.t('SignUp:invalidEmail');
const PASSWORD = 'test';
const WRONG_CONFIRM_PASSWORD = 'wrongPassword';

describe('Signup test', () => {
  test('Should render 5 form inputs', () => {
    const { container } = render(<SignUp />);
    expect(container.querySelectorAll('input').length).toBe(FORM_FIELDS_AMOUNT);
    cleanup();
  });

  test('Should render 2 buttons', async () => {
    render(<SignUp />);

    expect(await screen.findAllByRole('button')).toHaveLength(FORM_BUTTONS_AMOUNT);
    cleanup();
  });

  test('Wolox logo should be render and contain alt text', () => {
    render(<SignUp />);
    expect(screen.getByAltText(WOLOX_LOGO_ALT_TEXT as string));
    cleanup();
  });
  test('Should render email error message', () => {
    const { container } = render(<SignUp />);
    const emailInput = container.querySelector('input[type=email]');
    if (!emailInput) {
      throw new Error('Email input not found');
    }

    fireEvent.change(emailInput, { target: { value: 'test' } });
    expect(screen.findByText(INVALID_EMAIL as string));
    cleanup();
  });

  test('Should render required message for form fields', async () => {
    const { container } = render(<SignUp />);

    const signupButton = container.querySelector('button[type="submit"]');
    if (!signupButton) {
      throw new Error('Signup button not found');
    }

    fireEvent.click(signupButton);
    await waitFor(() => screen.findAllByRole('alert'));
    expect(screen.getAllByRole('alert').length).toBe(MAX_FORM_FIELDS_ERRORS);
    cleanup();
  });

  test('Should render password match error', async () => {
    const { container } = render(<SignUp />);
    const passwordInput = container.querySelector(`input[name=${SIGN_UP_FIELDS.password}]`);
    if (!passwordInput) {
      throw new Error('Password input not found');
    }

    const confirmPasswordInput = container.querySelector(
      `input[name=${SIGN_UP_FIELDS.passwordConfirmation}]`
    );
    if (!confirmPasswordInput) {
      throw new Error('Confirm password input not found');
    }

    userEvent.type(passwordInput, PASSWORD);
    userEvent.type(confirmPasswordInput, WRONG_CONFIRM_PASSWORD);

    await waitFor(() => [screen.findAllByRole('textbox'), screen.findAllByRole('alert')]);
    expect(screen.getAllByRole('alert').length).toBe(1);
  });
});
