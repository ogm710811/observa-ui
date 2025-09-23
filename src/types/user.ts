import { ReactElement } from 'react';

export interface User {
  employeeId: string;
  name: string;
  email: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface Metric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  color: string;
  icon: ReactElement;
}

export interface Tool {
  id: string;
  name: string;
  url: string;
  icon: ReactElement;
  category: string;
}

export interface RecentActivity {
  text: string;
  time: string;
}

export interface QuickAction {
  name: string;
  icon: string;
}
