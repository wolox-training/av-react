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
  let container: Element | null = null;

  beforeEach(() => {
    const { container: renderContainer } = render(
      <Router history={history}>
        <Home />
      </Router>
    );
    container = renderContainer;
  });

  test('Should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  test('Should render appbar content', () => {
    expect(screen.getByAltText('Home:logoAlt')).toBeInTheDocument();
    expect(screen.getByText('Home:logout')).toBeInTheDocument();
  });

  test('Should redirect to login', async () => {
    userEvent.click(screen.getByText('Home:logout'));
    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith(PATHS.login));
  });
});
