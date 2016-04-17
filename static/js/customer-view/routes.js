import React from 'react';
import { Route } from 'react-router';

import Menu from './components/menu';

import ViewSche from './components/view-sche/routes';
import MakeResv from './components/make-resv/routes';
import UpdateResv from './components/update-resv/routes';
import CancelResv from './components/cancel-resv/routes';
import Review from './components/review/routes';
import SchoolInfo from './components/school-info/school-info';

export default (
    <Route>
        <Route path='menu' component={Menu} />
        {ViewSche}
        {MakeResv}
        {UpdateResv}
        {CancelResv}
        {Review}
        <Route path='school-info' component={SchoolInfo} />
    </Route>
);