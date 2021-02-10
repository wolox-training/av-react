import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router';

import { TOKEN_KEY } from '~config/api/constants';
import { PATHS } from '~constants/paths';
import LocalStorageService from '~services/LocalStorageService';

interface Props {
  route: string;
  children: ReactNode;
}

function AuthRoute({ route, children }: Props) {
  const token = LocalStorageService.getValue(TOKEN_KEY);
  return token ? <Redirect to={PATHS.home} /> : <Route to={route}>{children}</Route>;
}

export default AuthRoute;
