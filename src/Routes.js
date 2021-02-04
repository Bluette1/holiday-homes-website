import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import App from './components/App';
import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './layouts/NotFound';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={App} />
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
