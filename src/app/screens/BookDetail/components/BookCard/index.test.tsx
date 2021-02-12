import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { OK_BOOK_RESPONSE_API } from './mocks';

import BookCard from './';

describe('BookDetail test', () => {
  test('Should match snapshot', () => {
    const { container } = render(
      <Router>
        <BookCard data={OK_BOOK_RESPONSE_API} />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render alt texts', () => {
    render(
      <Router>
        <BookCard data={OK_BOOK_RESPONSE_API} />
      </Router>
    );
    expect(screen.getByAltText('BookCard:backArrowAlt')).toBeInTheDocument();
    expect(screen.getByAltText('BookCard:bookAlt')).toBeInTheDocument();
    expect(screen.getByAltText('BookCard:badgeAlt')).toBeInTheDocument();
  });

  test('Should render book data', () => {
    render(
      <Router>
        <BookCard data={OK_BOOK_RESPONSE_API} />
      </Router>
    );
    expect(screen.getByText(OK_BOOK_RESPONSE_API.title)).toBeInTheDocument();
    expect(screen.getByText(OK_BOOK_RESPONSE_API.genre)).toBeInTheDocument();
    expect(screen.getByText(OK_BOOK_RESPONSE_API.author)).toBeInTheDocument();
    expect(screen.getByText(OK_BOOK_RESPONSE_API.editor)).toBeInTheDocument();
    expect(screen.getByText(OK_BOOK_RESPONSE_API.year)).toBeInTheDocument();
  });
});
