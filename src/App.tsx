import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@/Router';

import { LoadingScreen } from './components/common/LoadingScreen';
import { ThemeProvider } from './components/common/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { User } from './types/dashboard';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate PingId authentication
    setTimeout(() => {
      setUser({
        employeeId: 'EMP456',
        name: 'John Doe',
        email: 'john.doe@capitalone.com',
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout user={user}>
          <AppRouter /* user={user} */ />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
