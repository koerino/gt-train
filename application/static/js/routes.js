import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Login from './login/login';
import Registration from './registration/registration';
import CustomerView from './customer-view/routes';
import ManagerView from './manager-view/routes';
import NotFound from './shared/notfound'

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="registration" component={Registration} />
        {CustomerView}
        {ManagerView}
        <Route path="*" component={NotFound} />
    </Route>
);