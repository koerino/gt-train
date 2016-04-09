import React from 'react';
import { Route } from 'react-router';

import SearchSche from './search-sche';
import ViewSche from './view-sche';

export default (
    <Route>
        <Route path="schedule" component={SearchSche} />
        <Route path="schedule/view" component={ViewSche} /> {/* to-be-dynamic */}
    </Route>
);