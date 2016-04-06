import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

ReactDOM.render(
<h1>Hello, world!</h1>,
  document.getElementById('root')
);
/*
ReactDOM.render(
    <Router history={browserHistory} routes={routes} />
    , document.getElementById('root'));
    */