import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { OK_BOOKS_API_RESPONSE } from './mocks';

import BooksList from './';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/books`;
const MAX_BOOKS_LENGTH = 2;
const server = setupServer(rest.get(`${API_URL}`, (req, res, ctx) => res(ctx.json(OK_BOOKS_API_RESPONSE))));

describe('BooksList test', () => {
  test('Should match snapshot', () => {
    const { container } = render(
      <Router>
        <BooksList />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render two books with alt text', async () => {
    server.listen();
    render(
      <Router>
        <BooksList />
      </Router>
    );
    await waitFor(() => expect(screen.getAllByAltText('BooksList:bookAlt').length).toBe(MAX_BOOKS_LENGTH));
  });
});
