import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import '../scss/application.scss';
import CustomRoute from '~components/CustomRoute';
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
        <CustomRoute component={Login} authenticated={logged} path={PATHS.login} exact />
        <CustomRoute component={SignUp} authenticated={logged} path={PATHS.signup} exact />
        <CustomRoute component={Home} authenticated={logged} path={PATHS.home} protect exact />
      </Switch>
    </Router>
  );
}

export default App;
