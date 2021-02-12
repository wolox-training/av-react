import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import '../scss/application.scss';
import CustomRoute from '~components/CustomRoute';
import LocalStorageService from '~services/LocalStorageService';
import { CLIENT_KEY, TOKEN_KEY, UID_KEY } from '~config/api/constants';
import { PATHS } from '~constants/paths';
import { headersSetup } from '~config/api';
import Loading from '~components/Spinner/components/loading';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';

function App() {
  const logged = LocalStorageService.getValue(TOKEN_KEY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = LocalStorageService.getValue(TOKEN_KEY);
      const client = LocalStorageService.getValue(CLIENT_KEY);
      const uid = LocalStorageService.getValue(UID_KEY);

      headersSetup(token, client, uid);
      setLoaded(true);
    }
  }, [loaded]);

  return loaded ? (
    <Router>
      <Switch>
        <CustomRoute component={Login} authenticated={logged} path={PATHS.login} exact />
        <CustomRoute component={SignUp} authenticated={logged} path={PATHS.signup} exact />
        <CustomRoute component={Home} authenticated={logged} path={PATHS.home} protect exact />
      </Switch>
    </Router>
  ) : (
    <Loading />
  );
}

export default App;
