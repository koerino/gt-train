import React from 'react';
import { Route } from 'react-router';

import SearchSche from './search-sche';
import ViewSche from './view-sche';

export default (
    <Route>
        <Route path="search-schedules" component={SearchSche} />
        <Route path="schedules" component={ViewSche} />
    </Route>
);