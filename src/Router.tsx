import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '@/pages/Home';
import { ObservaDashboard } from '@/pages/ObservaDashboard';
import ObservaDetails from '@/pages/ObservaDetails';
// import { Settings } from './components/settings/Settings'; // Example of future route

// Optionally accept props (like user) if you want to pass them to routes/layouts
// type RouterProps = {
//   user: Dashboard;
// };

export function AppRouter(/* { user }: RouterProps */) {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<ObservaDashboard />} path="/observa-dashboard" />
      <Route element={<ObservaDetails />} path="/observa-details" />
    </Routes>
  );
}
