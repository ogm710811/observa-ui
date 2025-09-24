import React from 'react';

import { Metric } from '@/types/user';

interface KPICardProps {
  metric: Metric;
}

export const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  // const colorClasses = {
  //   blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  //   green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  //   yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  //   red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  //   purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  //   indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  //   teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
  //   orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  // };
  //
  // const bgColorClass = colorClasses[metric.color as keyof typeof colorClasses] || colorClasses.blue;

  // Use only black & white color classes
  const colorClasses = {
    // All-white background with black text, no color variant
    // icon/label appearance consistent across all metrics
    default: 'bg-gray-100 text-black dark:bg-blue-900',
  };

  // Always use the default class
  const bgColorClass = colorClasses.default;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColorClass}`}>
          <span className="text-2xl">{metric.icon}</span>
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
