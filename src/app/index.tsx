import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../scss/application.scss';
import LocalStorageService from '~services/LocalStorageService';
import { TOKEN_KEY } from '~utils/constants';

import { PATHS } from '../constants/paths';

import SignUp from './screens/SignUp';
import Login from './screens/Login';
import Home from './screens/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path={PATHS.home}
          render={() => (LocalStorageService.getValue(TOKEN_KEY) ? <Home /> : <Login />)}
        />
        <Route path={PATHS.signup}>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
