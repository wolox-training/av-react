import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../scss/application.scss';

import SignUp from './screens/SignUp';
import Login from './screens/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign_up">
          <SignUp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
