import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../scss/application.scss';
import PrivateRoute from '~components/PrivateRoute';
import AuthRoute from '~components/AuthRoute';

import { PATHS } from '../constants/paths';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={PATHS.login}>
          <AuthRoute route={PATHS.login}>
            <Login />
          </AuthRoute>
        </Route>
        <Route path={PATHS.signup}>
          <AuthRoute route={PATHS.signup}>
            <SignUp />
          </AuthRoute>
        </Route>
        <PrivateRoute route={PATHS.home}>
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
