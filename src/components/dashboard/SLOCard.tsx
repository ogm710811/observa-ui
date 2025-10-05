import { ExternalLink, Flame, Target, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

import { Metric } from '@/types/dashboard';

export const SLO_VARIANTS = {
  'SLO Within Target': {
    iconBg: 'bg-green-50',
    Icon: Target,
    iconColor: 'text-green-600',
    trendColor: 'text-green-600',
    TrendingIcon: TrendingDown,
    valueColor: 'text-black',
    breakdownColor: 'text-green-600',
  },
  'SLO Over Budget': {
    iconBg: 'bg-orange-50',
    Icon: Flame,
    iconColor: 'text-orange-600',
    trendColor: 'text-red-600',
    TrendingIcon: TrendingUp,
    valueColor: 'text-black',
    breakdownColor: 'text-orange-600',
  },
};

const SLOCard: React.FC<{ metric: Metric }> = ({ metric }) => {
  const config = SLO_VARIANTS[metric.label];
  if (!config) return null;
  const { Icon, iconBg, iconColor, trendColor, TrendingIcon, valueColor, breakdownColor } = config;
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300 p-6 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 sm:p-3 rounded-lg ${iconBg}`}>
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendingIcon className="w-4 h-4" />
          <span className="font-medium">
            {typeof metric.change === 'number' ? metric.change.toFixed(2) : metric.change}
          </span>
        </div>
      </div>
      <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{metric.label}</h3>
      <div className="flex items-baseline gap-2">
        <p className={`text-2xl font-bold ${valueColor}`}>{metric.value}</p>
        <span className="text-sm text-gray-500">services</span>
      </div>
      <div className="mt-4 py-4 border-t border-gray-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">Avg Burn Rate</span>
          <span className={`text-sm font-bold ${breakdownColor}`}>
            {metric.breakdown?.avgBurnRate}x
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">Percentage</span>
          <span className="text-sm font-bold text-gray-900">{metric.breakdown?.percent}%</span>
        </div>
      </div>
      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-end">
          <button className="text-xs text-primary hover:text-blue-700 font-medium flex items-center gap-1">
            Details
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SLOCard;
