import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import BookDetail from './';

describe('BookDetail test', () => {
  test('Should match snapshot', () => {
    const { container } = render(
      <Router>
        <BookDetail />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });
});
