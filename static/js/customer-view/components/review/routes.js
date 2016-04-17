import React from 'react';
import { Route } from 'react-router';

import WriteReview from './write-review';
import SearchTrain from './search-train';
import ViewReview from './view-review';

export default (
    <Route>
        <Route path="write-review" component={WriteReview} />
        <Route path="review-search" component={SearchTrain} />
        <Route path="reviews" component={ViewReview} /> {/* to-be-dynamic */}
    </Route>
);