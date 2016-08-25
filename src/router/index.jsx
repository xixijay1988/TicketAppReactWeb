import {Router, Route, Link, browserHistory,hashHistory} from 'react-router';
import React from 'react';

import HomeComponent from '../components/HomeComponent.jsx';
import SignupComponent from '../components/SignupComponent.jsx';
import SigninComponent from '../components/SigninComponent.jsx';
import NotFoundComponent from '../components/NotFoundComponent.jsx';

export default function renderRouter() {
  return (
  <Router history={browserHistory}>
    <Route path="/" component={HomeComponent} />
    <Route path="/signin" component={SigninComponent} />
    <Route path="/signup" component={SignupComponent} />
    <Route path="*" component={NotFoundComponent} />
  </Router>
);
}
