import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import i18next from 'i18next';

import { SIGN_UP_FIELDS } from '../../screens/SignUp/constants';

import CustomInput from './';

const register = jest.fn();
const ERROR_MESSAGE = 'This is a error message';
const MINIMUM_ALERT_LENGTH = 1;
const FIRST_NAME = i18next.t('SignUp:firstName') as string;

describe('Custom input test', () => {
  test('Should render input type text as default', () => {
    const { container } = render(
      <CustomInput name={SIGN_UP_FIELDS.firstName} inputRef={register} error="" label={FIRST_NAME} />
    );

    const firstnameInput = container.querySelector(`input[name=${SIGN_UP_FIELDS.firstName}]`);
    if (!firstnameInput) {
      throw new Error('Firstname input not found');
    }
    expect(firstnameInput.getAttribute('type')).toBe('text');
    cleanup();
  });

  test('Should render error message', async () => {
    render(
      <CustomInput
        name={SIGN_UP_FIELDS.firstName}
        inputRef={register}
        error={ERROR_MESSAGE}
        label={FIRST_NAME}
      />
    );
    expect((await screen.findAllByRole('alert')).length).toBe(MINIMUM_ALERT_LENGTH);
  });

  test('Should render label text', async () => {
    render(<CustomInput name={SIGN_UP_FIELDS.firstName} inputRef={register} error="" label={FIRST_NAME} />);

    await screen.findByText(FIRST_NAME);
  });
});
