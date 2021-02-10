import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router';

import { TOKEN_KEY } from '~config/api/constants';
import { PATHS } from '~constants/paths';
import LocalStorageService from '~services/LocalStorageService';

interface Props {
  route: string;
  children: ReactNode;
}

function PrivateRoute({ route, children }: Props) {
  const token = LocalStorageService.getValue(TOKEN_KEY);

  return token ? (
    <Route exact path={route}>
      {children}
    </Route>
  ) : (
    <Redirect exact to={PATHS.login} />
  );
}

export default PrivateRoute;
