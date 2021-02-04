import React from 'react';
import { screen, render } from '@testing-library/react';

import Appbar from './';

describe('Appbar test', () => {
  test('Should match snapshot', () => {
    const { container } = render(<Appbar />);
    expect(container).toMatchSnapshot();
  });

  test('Should render content', () => {
    render(<Appbar />);
    expect(screen.getByAltText('Home:logoAlt')).toBeInTheDocument();
    expect(screen.getByText('Home:logout')).toBeInTheDocument();
  });
});
