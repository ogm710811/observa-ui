import React, { ReactNode, useState } from 'react';

import Navbar from '@/components/layout/Navbar';
import { User } from '@/types/dashboard';

import { Header } from './Header';

interface LayoutProps {
  user: User | null;
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header user={user} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex h-[calc(100vh-64px)] pt-16">
        <Navbar
          isCollapsed={sidebarCollapsed}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main
          className={`
          flex-1 overflow-y-auto transition-all duration-300
          ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
        `}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};
