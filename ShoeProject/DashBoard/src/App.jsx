// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import Dashboard from './Pages/Dashboard';
import UserPage from './pages/UserPage';
import ContentPage from './pages/ContentPage';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';

const App = () => (
  <Router>
          <Sidebar />

    <div >
      <Header />

      <div style={{ flexGrow: 1, padding: '200px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
