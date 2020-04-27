import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './containers/Dashboard';

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<Dashboard/>, wrapper) : false;
