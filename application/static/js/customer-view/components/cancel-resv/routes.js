import React from 'react';
import { Route } from 'react-router';

import SearchResv from './search-resv';
import CancelResv from './cancel-resv';

export default (
    <Route>
        <Route path="cancel-resv" component={SearchResv} />
        <Route path="cancel-resv/cancel" component={CancelResv} /> {/* to-be-dynamic */}
    </Route>
);