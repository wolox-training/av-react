import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { OK_BOOKS_API_RESPONSE } from '../../mocks';

import BookItem from './';

const MAX_BOOKS_LENGTH = 1;

describe('BookItem test', () => {
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(
      <Router>
        <BookItem book={OK_BOOKS_API_RESPONSE.page[0]} />
      </Router>
    );
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render books data', async () => {
    await waitFor(() => {
      expect(screen.getAllByAltText('BooksList:bookAlt').length).toBe(MAX_BOOKS_LENGTH);
      expect(screen.getByText(OK_BOOKS_API_RESPONSE.page[0].title)).toBeInTheDocument();
      expect(screen.getByText(OK_BOOKS_API_RESPONSE.page[0].author)).toBeInTheDocument();
    });
  });
});
