import React from 'react';
import { Route } from 'react-router';

import GiveReview from './give-review';
import SearchTrain from './search-train';
import ViewReview from './view-review';

export default (
    <Route>
        <Route path="review" component={GiveReview} />
        <Route path="review/search" component={SearchTrain} />
        <Route path="review/view" component={ViewReview} /> {/* to-be-dynamic */}
    </Route>
);