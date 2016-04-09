import React from 'react';
import { Route } from 'react-router';

import SearchResv from './search-resv';
import SelectResv from './select-resv';
import UpdateResv from './update-resv';

export default (
    <Route>
        <Route path="update-resv" component={SearchResv} />
        <Route path="update-resv/select" component={SelectResv} /> {/* to-be-dynamic */}
        <Route path="update-resv/update" component={UpdateResv} /> {/* to-be-dynamic */}
    </Route>
);