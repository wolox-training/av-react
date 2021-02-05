import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../scss/application.scss';
import LocalStorageService from '~services/LocalStorageService';
import { TOKEN_KEY } from '~utils/constants';
import withProvider from '~components/ProviderWrapper';
import { Context, reducer, INITIAL_STATE, useSelector } from '~app/contexts/User/reducer';

import { PATHS } from '../constants/paths';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';

function App() {
  const tokenExist = useSelector(state => state.accessToken) || LocalStorageService.getValue(TOKEN_KEY);

  return (
    <Router>
      <Switch>
        <Route path={PATHS.home} render={() => (tokenExist ? <Home /> : <Login />)} />
        <Route path={PATHS.signup}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default withProvider({ Context, reducer, initialState: INITIAL_STATE })(App);
