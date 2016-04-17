import React from 'react';
import { Route } from 'react-router';

import SearchResv from './search-resv';
import SelectResv from './select-resv';
import UpdateResv from './update-resv';

export default (
    <Route>
        <Route path="update-search" component={SearchResv} />
        <Route path="update-select" component={SelectResv} /> {/* to-be-dynamic */}
        <Route path="update" component={UpdateResv} /> {/* to-be-dynamic */}
    </Route>
);