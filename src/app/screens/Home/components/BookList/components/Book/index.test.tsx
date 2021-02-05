import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { OK_BOOKS_API_RESPONSE } from '../../mocks';

import Book from './';

const MAX_BOOKS_LENGTH = 2;

describe('Book test', () => {
  test('Should match snapshot', () => {
    const { container } = render(
      <Router>
        <Book books={OK_BOOKS_API_RESPONSE.page} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render books data', async () => {
    render(
      <Router>
        <Book books={OK_BOOKS_API_RESPONSE.page} />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getAllByAltText('BooksList:bookAlt').length).toBe(MAX_BOOKS_LENGTH);
      expect(screen.getByText(OK_BOOKS_API_RESPONSE.page[0].title)).toBeInTheDocument();
      expect(screen.getByText(OK_BOOKS_API_RESPONSE.page[0].author)).toBeInTheDocument();
    });
  });
});
