import React from 'react';
import { render, screen } from '@testing-library/react';

import BookNotFound from './';

describe('BookNotFound test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(<BookNotFound />);
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render not found text', () => {
    expect(screen.getByText('BookNotFound:notFound')).toBeInTheDocument();
  });
});
