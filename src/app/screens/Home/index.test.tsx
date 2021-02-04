import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { PATHS } from '~constants/paths';

import Home from './';

const history = createMemoryHistory();
const pushSpy = jest.spyOn(history, 'push');

describe('Home test', () => {
  test('Should match snapshot', () => {
    const { container } = render(
      <Router history={history}>
        <Home />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  test('Should render appbar content', () => {
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
    expect(screen.getByAltText('Home:logoAlt')).toBeInTheDocument();
    expect(screen.getByText('Home:logout')).toBeInTheDocument();
  });

  test('Should redirect to login', async () => {
    render(
      <Router history={history}>
        <Home />
      </Router>
    );
    userEvent.click(screen.getByText('Home:logout'));
    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith(PATHS.login));
  });
});
