import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../scss/application.scss';
import { PATHS } from '../constants/paths';

import SignUp from './screens/SignUp';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={PATHS.signup}>
          <SignUp />
        </Route>
        <Route path={PATHS.login}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
