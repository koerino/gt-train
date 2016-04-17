import React from 'react';
import { Route } from 'react-router';

import Menu from './components/menu';
import ViewPopRoute from './components/view-popular-route';
import ViewRevenue from './components/view-revenue';

export default (
    <Route>
        <Route path="admin" component={Menu} />
        <Route path="popular-routes" component={ViewPopRoute} />
        <Route path="revenue" component={ViewRevenue} />
    </Route>
);