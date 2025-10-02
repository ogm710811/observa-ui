import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import Monitoring from '@/pages/Monitoring';
import MonitoringPage from '@/pages/Monitoring2';
// import { Settings } from './components/settings/Settings'; // Example of future route

// Optionally accept props (like user) if you want to pass them to routes/layouts
// type RouterProps = {
//   user: Dashboard;
// };

export function AppRouter(/* { user }: RouterProps */) {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<MonitoringPage />} path="/monitoring" />
      <Route element={<Monitoring />} path="/monitoring2" />
    </Routes>
  );
}
