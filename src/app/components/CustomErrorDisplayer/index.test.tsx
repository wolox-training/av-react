import React from 'react';
import { render, screen } from '@testing-library/react';

import CustomErrorDisplayer from './';

const errorMsgs = ['Email already taken', 'Password do not match'];
const MAX_ALERTS_LENGTH = 2;

describe('CustomErrorDisplayer test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(<CustomErrorDisplayer errors={errorMsgs} />);
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render error messages', () => {
    expect(screen.getAllByRole('alert').length).toBe(MAX_ALERTS_LENGTH);
  });
});
