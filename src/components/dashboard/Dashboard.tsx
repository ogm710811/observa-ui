import { FileStack, Info, LifeBuoy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import PageHeader from '@/components/common/PageHeader';
import QuickLinks from '@/components/dashboard/QuickLinks';
import WhatIsNew from '@/components/dashboard/WhatIsNew';
import { mockServices } from '@/mock/ServicesMockData';
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

      // Calculate metrics from mockServices
      const totalServices = mockServices.length;
      const healthyServices = mockServices.filter(s => s.status === 'healthy').length;
      const warningServices = mockServices.filter(s => s.status === 'warning').length;
      const downServices = mockServices.filter(s => s.status === 'down').length;
      const withinTarget = mockServices.filter(s => s.sloBurnRate < 1).length;
      const overBudget = mockServices.filter(s => s.sloBurnRate >= 1).length;
      const withinTargetServices = mockServices.filter(s => s.sloBurnRate < 1);
      const overBudgetServices = mockServices.filter(s => s.sloBurnRate >= 1);

      const avgWithinTarget =
        withinTargetServices.length > 0
          ? (
              withinTargetServices.reduce((sum, s) => sum + s.sloBurnRate, 0) /
              withinTargetServices.length
            ).toFixed(2)
          : '0.00';

      const avgOverBudget =
        overBudgetServices.length > 0
          ? (
              overBudgetServices.reduce((sum, s) => sum + s.sloBurnRate, 0) /
              overBudgetServices.length
            ).toFixed(2)
          : '0.00';

      // const avgBurnRate =
      //   totalServices > 0
      //     ? (mockServices.reduce((acc, s) => acc + s.sloBurnRate, 0) / totalServices).toFixed(2)
      //     : '0.00';

      // const recentDeployments = mockServices.filter(s => {
      //   const deploymentDate = new Date(s.lastDeployment);
      //   const twoDaysAgo = new Date();
      //   twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      //   return deploymentDate > twoDaysAgo;
      // }).length;

      const avgSecurityScore =
        totalServices > 0
          ? Math.round(mockServices.reduce((acc, s) => acc + s.securityScore, 0) / totalServices) +
            '%'
          : '0%';

      const avgResponseTime =
        totalServices > 0
          ? Math.round(mockServices.reduce((acc, s) => acc + s.responseTime, 0) / totalServices) +
            'ms'
          : '0ms';

      setMetrics([
        {
          label: 'Total Services',
          status: 'total',
          value: totalServices,
          change: 12,
          trend: 'up',
        },
        {
          label: 'Healthy Services',
          status: 'healthy',
          value: healthyServices,
          change: 5,
          trend: 'up',
        },
        {
          label: 'Services Down',
          status: 'critical',
          value: downServices,
          change: 1,
          trend: 'up',
        },
        {
          label: 'Services with Warnings',
          status: 'warning',
          value: warningServices,
          change: -2,
          trend: 'down',
        },
        // {
        //   label: 'Avg SLO Burn Rate',
        //   status: 'slo',
        //   value: 10,
        //   change: -0.08,
        //   trend: 'down',
        // },
        {
          label: 'SLO Within Target',
          status: 'healthy',
          value: withinTarget,
          change: Number(avgWithinTarget),
          trend: 'down',
          breakdown: {
            avgBurnRate: Number(avgWithinTarget),
            percent: totalServices > 0 ? Math.round((withinTarget / totalServices) * 100) : 0,
          },
        },
        {
          label: 'SLO Over Budget',
          status: 'critical',
          value: overBudget,
          change: Number(avgOverBudget),
          trend: 'up',
          breakdown: {
            avgBurnRate: Number(avgOverBudget),
            percent: totalServices > 0 ? Math.round((overBudget / totalServices) * 100) : 0,
          },
        },
        // {
        //   label: 'Recent Deployments',
        //   status: 'recent',
        //   value: recentDeployments,
        //   change: 8,
        //   trend: 'up',
        // },
        {
          label: 'Security Score',
          status: 'security',
          value: avgSecurityScore,
          change: 2,
          trend: 'up',
        },
        {
          label: 'Avg Response Time',
          status: 'response',
          value: avgResponseTime,
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
        {/* Quick Actions */}
        {/*<QuickActions actions={quickActions} />*/}
        <div className="grid grid-rows-2 lg:grid-rows-2 gap-6">
          <QuickLinks links={quickLinks} />
          <WhatIsNew news={news} />
        </div>
        {/* Recent Activity */}
        <RecentActivities activities={recentActivities} />
      </div>
    </div>
  );
};
