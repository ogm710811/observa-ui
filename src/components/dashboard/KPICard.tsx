import {
  Activity,
  Check,
  CircleX,
  ExternalLink,
  Flame,
  Rocket,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import SLOCard, { SLO_VARIANTS } from '@/components/dashboard/SLOCard';
import { Metric } from '@/types/dashboard';

type Status =
  | 'total'
  | 'healthy'
  | 'warning'
  | 'critical'
  | 'slo'
  | 'recent'
  | 'security'
  | 'response';

interface KPICardProps {
  metric: Metric;
}

const statusColorMap: Record<Status, string> = {
  total: 'bg-blue-100 text-blue-600',
  healthy: 'text-favorable bg-green-50',
  warning: 'text-warning bg-yellow-50',
  critical: 'text-critical bg-red-50',
  slo: 'text-orange-500 bg-orange-50',
  recent: 'text-cyan-500 bg-cyan-50',
  security: 'text-indigo-500 bg-indigo-50',
  response: 'text-teal-500 bg-teal-50',
};
const getStatusColor = (status: string) =>
  statusColorMap[status as Status] || 'text-gray-600 bg-gray-50';

const statusIconMap: Record<Status, React.ReactNode> = {
  total: <Activity />,
  healthy: <Check />,
  warning: <TriangleAlert />,
  critical: <CircleX />,
  slo: <Flame />,
  recent: <Rocket />,
  security: <ShieldCheck />,
  response: <Zap />,
};
const getStatusIcon = (status: string) => statusIconMap[status as Status] || null;

export const KPICard = ({ metric }: KPICardProps) => {
  const navigate = useNavigate();

  // Render SLO cards with variant
  if (SLO_VARIANTS[metric.label]) {
    return <SLOCard metric={metric} />;
  }

  // Default card
  const trend =
    metric.trend &&
    ((
      metric.trend === 'up'
        ? metric.label.includes('Down') || metric.label.includes('Warning')
        : !(metric.label.includes('Down') || metric.label.includes('Warning'))
    )
      ? 'text-red-500'
      : 'text-green-500');

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusColor(metric.status)}`}>
          <span className="text-2xl">{getStatusIcon(metric.status)}</span>
        </div>
        {metric.trend && (
          <div className={`flex items-center space-x-1 text-sm ${trend}`}>
            {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(metric.change || 0)}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-black mb-1">{metric.label}</h3>
        <p className="text-2xl font-bold text-black">{metric.value}</p>
      </div>
      <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-end">
          <button
            className="text-xs text-primary hover:text-blue-700 font-medium flex items-center gap-1"
            onClick={() => {
              // Optionally, send other filters for classic KPIs if needed.
              // Here is an example: filter by status
              if (metric.label.includes('Healthy')) {
                navigate('/observability', { state: { status: 'healthy' } });
              } else if (metric.label.includes('Down')) {
                navigate('/observability', { state: { status: 'down' } });
              } else if (metric.label.includes('Warning')) {
                navigate('/observability', { state: { status: 'warning' } });
              } else {
                navigate('/observability'); // fallback: no filter
              }
            }}
          >
            Details
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
