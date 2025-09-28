import {
  Activity,
  Check,
  CircleX,
  Flame,
  Rocket,
  ShieldCheck,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import React from 'react';

import { Metric } from '@/types/dashboard';

interface KPICardProps {
  metric: Metric;
}

export const KPICard = ({ metric }: KPICardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'total':
        return 'bg-blue-100 text-blue-600';
      case 'healthy':
        return 'text-favorable bg-green-50';
      case 'warning':
        return 'text-warning bg-yellow-50';
      case 'critical':
        return 'text-critical bg-red-50';
      case 'slo':
        return 'text-orange-500 bg-orange-50';
      case 'recent':
        return 'text-cyan-500 bg-cyan-50';
      case 'security':
        return 'text-indigo-500 bg-indigo-50';
      case 'response':
        return 'text-teal-500 bg-teal-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'total':
        return <Activity />;
      case 'healthy':
        return <Check />;
      case 'warning':
        return <TriangleAlert />;
      case 'critical':
        return <CircleX />;
      case 'slo':
        return <Flame />;
      case 'recent':
        return <Rocket />;
      case 'security':
        return <ShieldCheck />;
      case 'response':
        return <Zap />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
          <span className="text-2xl">{getStatusIcon(metric.status)}</span>
        </div>
        {metric.trend && (
          <div
            className={`flex items-center space-x-1 text-sm ${
              metric.trend === 'up'
                ? metric.label.includes('Down') || metric.label.includes('Warning')
                  ? 'text-red-500'
                  : 'text-green-500'
                : metric.label.includes('Down') || metric.label.includes('Warning')
                  ? 'text-green-500'
                  : 'text-red-500'
            }`}
          >
            {metric.trend === 'up' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            )}
            <span>{Math.abs(metric.change || 0)}</span>
          </div>
        )}
      </div>

      {/*<div>*/}
      {/*  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">*/}
      {/*    {metric.label}*/}
      {/*  </h3>*/}
      {/*  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>*/}
      {/*</div>*/}

      <div>
        {/* Metric label in black */}
        <h3 className="text-sm font-medium text-black mb-1">{metric.label}</h3>
        <p className="text-2xl font-bold text-black">{metric.value}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Last updated</span>
          <span>2 min ago</span>
        </div>
      </div>
    </div>
  );
};
