import React from 'react';
import Sidebar from '../components/sidebar';
import Content from '../components/content';
import '../styles/home.scss';

const home = () => (
  <div className="home">
    <Sidebar/>
    <Content/>
  </div>
);

export default home;