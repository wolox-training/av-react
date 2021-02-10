import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import '../scss/application.scss';
import AuthRoute from '~components/AuthRoute';
import LocalStorageService from '~services/LocalStorageService';
import { TOKEN_KEY } from '~config/api/constants';
import { PATHS } from '~constants/paths';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';

function App() {
  const logged = LocalStorageService.getValue(TOKEN_KEY);

  return (
    <Router>
      <Switch>
        <AuthRoute component={Login} authenticated={logged} path={PATHS.login} exact />
        <AuthRoute component={SignUp} authenticated={logged} path={PATHS.signup} exact />
        <AuthRoute component={Home} authenticated={logged} path={PATHS.home} protect exact />
      </Switch>
    </Router>
  );
}

export default App;
