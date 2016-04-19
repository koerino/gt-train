import React from 'react';
import { Route } from 'react-router';

import SearchResv from './search-resv';
import CancelResv from './cancel-resv';

export default (
    <Route>
        <Route path="cancel-search" component={SearchResv} />
        <Route path="cancel" component={CancelResv} />
    </Route>
);