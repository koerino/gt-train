import React from 'react';
import { Route } from 'react-router';

import SearchSche from './search-sche';
import SelectSche from './select-sche';
import TravelExtras from './travel-extras';
import MakeResv from './make-resv';
import PaymentInfo from './payment-info';
import Confirmation from './confirmation';

export default (
    <Route>
        <Route path="reserve" component={SearchSche} />  
        <Route path="reserve/select" component={SelectSche} /> {/* to-be-dynamic */}
        <Route path="reserve/extras" component={TravelExtras} />
        <Route path="reserve/resv" component={MakeResv} /> {/* to-be-dynamic */}
        <Route path="reserve/payment" component={PaymentInfo} />
        <Route path="reserve/confirmation" component={Confirmation} /> {/* to-be-dynamic */}
    </Route>
);