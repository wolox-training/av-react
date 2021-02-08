import React from 'react';
import { screen, render } from '@testing-library/react';

import Appbar from './';

describe('Appbar test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(<Appbar />);
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render content', () => {
    expect(screen.getByAltText('Home:logoAlt')).toBeInTheDocument();
    expect(screen.getByText('Home:logout')).toBeInTheDocument();
  });
});
