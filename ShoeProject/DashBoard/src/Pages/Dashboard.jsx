// src/pages/Dashboard.js
import React from 'react';
import Analytics from '../components/Analytics';
import ContentManagement from '../components/ContentManagement';

const Dashboard = () => (
  <div>
    <h1 style={{textAlign:"center"}}>Dashboard</h1>
    <Analytics />
    <ContentManagement />
  </div>
);

export default Dashboard;
