import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import BookDetail from './';

describe('BookDetail test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(
      <Router>
        <BookDetail />
      </Router>
    );
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
