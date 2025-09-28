import { FileStack, Info, LifeBuoy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import PageHeader from '@/components/common/PageHeader';
import QuickLinks from '@/components/dashboard/QuickLinks';
import WhatIsNew from '@/components/dashboard/WhatIsNew';
import { Metric, News, QuickLink, RecentActivity } from '@/types/dashboard';
import { Header } from '@/types/pages';

import { KPICard } from './KPICard';
import { RecentActivities } from './RecentActivities';

const recentActivities: RecentActivity[] = [
  { text: 'Service deployment completed for API Gateway', time: '2 minutes ago' },
  { text: 'Security scan passed for Payment Service', time: '15 minutes ago' },
  { text: 'Cost optimization report generated', time: '1 hour ago' },
  { text: 'New service registered: Analytics API', time: '3 hours ago' },
];

const news: News[] = [
  { text: 'Seamless nav to other SPAs via left sidebar links.' },
  { text: 'PingId user identification shown in header profile.' },
  { text: 'Skeleton loaders + accessible error state patterns.' },
];

// export const quickActions: QuickAction[] = [
//   { name: 'Deploy Service', icon: '🚀' },
//   { name: 'View Logs', icon: '📝' },
//   { name: 'Run Tests', icon: '🧪' },
//   { name: 'Check Security', icon: '🔒' },
// ];

const quickLinks: QuickLink[] = [
  { id: '0', text: 'Documentation', url: '#docs', icon: <FileStack /> },
  { id: '1', text: 'Get Help', url: '#docs', icon: <LifeBuoy /> },
  { id: '2', text: 'FAQ', url: '#docs', icon: <Info /> },
];

const pageHeader: Header = {
  title: 'Portal Overview',
  subtitle: 'Real-time metrics and health status of all services',
};

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setMetrics([
        {
          label: 'Total Services',
          status: 'total',
          value: 247,
          change: 12,
          trend: 'up',
        },
        {
          label: 'Healthy Services',
          status: 'healthy',
          value: 223,
          change: 5,
          trend: 'up',
        },
        {
          label: 'Services with Warnings',
          status: 'warning',
          value: 18,
          change: -2,
          trend: 'down',
        },
        {
          label: 'Services Down',
          status: 'critical',
          value: 6,
          change: 1,
          trend: 'up',
        },
        {
          label: 'Avg SLO Burn Rate',
          status: 'slo',
          value: '0.42',
          change: -0.08,
          trend: 'down',
        },
        {
          label: 'Recent Deployments',
          status: 'recent',
          value: 34,
          change: 8,
          trend: 'up',
        },
        {
          label: 'Security Score',
          status: 'security',
          value: '94%',
          change: 2,
          trend: 'up',
        },
        {
          label: 'Avg Response Time',
          status: 'response',
          value: '124ms',
          change: -15,
          trend: 'down',
        },
      ]);
      setLoading(false);
    } catch (_err) {
      setError('Failed to fetch metrics');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={fetchMetrics}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader pageHeader={pageHeader} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a className="text-gray-700 dark:text-gray-300" href="#123">
              Home
            </a>
          </li>
          <li>
            {/*<div className="flex items-center">*/}
            {/*  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">*/}
            {/*    <path*/}
            {/*      clipRule="evenodd"*/}
            {/*      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"*/}
            {/*      fillRule="evenodd"*/}
            {/*    />*/}
            {/*  </svg>*/}
            {/*  <span className="ml-1 text-gray-500 md:ml-2">Dashboard</span>*/}
            {/*</div>*/}
          </li>
        </ol>
      </nav>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <KPICard key={index} metric={metric} />
        ))}
      </div>

      {/* Additional Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivities activities={recentActivities} />

        {/* Quick Actions */}
        {/*<QuickActions actions={quickActions} />*/}
        <div className="grid grid-rows-2 lg:grid-rows-2 gap-6">
          <QuickLinks links={quickLinks} />
          <WhatIsNew news={news} />
        </div>
      </div>
    </div>
  );
};
