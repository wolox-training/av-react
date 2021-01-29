import React from 'react';
import { render, screen } from '@testing-library/react';

import { SIGN_UP_FIELDS } from '../../screens/SignUp/constants';

import CustomInput from './';

const register = jest.fn();
const ERROR_MESSAGE = 'This is a error message';
const MINIMUM_ALERT_LENGTH = 1;

describe('Custom input test', () => {
  test('Should match snapshot', () => {
    const { container } = render(<CustomInput />);
    expect(container).toMatchSnapshot();
  });

  test('Should render input type text as default', () => {
    render(
      <CustomInput name={SIGN_UP_FIELDS.firstName} inputRef={register} error="" label="SignUp:firstName" />
    );
    expect(screen.getByLabelText('SignUp:firstName').getAttribute('type')).toBe('text');
  });

  test('Should render error message', () => {
    render(
      <CustomInput
        name={SIGN_UP_FIELDS.firstName}
        inputRef={register}
        error={ERROR_MESSAGE}
        label="SignUp:firstName"
      />
    );
    expect(screen.getAllByRole('alert').length).toBe(MINIMUM_ALERT_LENGTH);
  });

  test('Should render label text', () => {
    render(
      <CustomInput name={SIGN_UP_FIELDS.firstName} inputRef={register} error="" label="SignUp:firstName" />
    );
    expect(screen.getByText('SignUp:firstName')).toBeInTheDocument();
  });
});
