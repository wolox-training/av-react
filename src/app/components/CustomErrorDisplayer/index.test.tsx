import React from 'react';
import { render, screen } from '@testing-library/react';

import CustomErrorDisplayer from './';

const errorMsgs = ['Email already taken', 'Password do not match'];
const MAX_ALERTS_LENGTH = 2;

describe('CustomErrorDisplayer test', () => {
  test('Should match snapshot', () => {
    const { container } = render(<CustomErrorDisplayer errors={errorMsgs} />);
    expect(container).toMatchSnapshot();
  });

  test('Should render error messages', () => {
    render(<CustomErrorDisplayer errors={errorMsgs} />);
    expect(screen.getAllByRole('alert').length).toBe(MAX_ALERTS_LENGTH);
  });
});
