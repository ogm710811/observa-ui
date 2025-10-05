import { Calendar, ExternalLink } from 'lucide-react';
import React from 'react';

import MiniSparkline from '@/components/observability/MiniSparkline';
import ServiceStatusBadge from '@/components/observability/ServiceStatusBadge';
import { Service } from '@/types/monitoring';

interface ServiceCardProps {
  service: Service;
  onDetailsClick?: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onDetailsClick }) => {
  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'prod':
        return 'bg-blue-100 text-blue-700';
      case 'stage':
        return 'bg-purple-100 text-purple-700';
      case 'dev':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getMetricStatus = (value: number, good: number, warning: number) => {
    if (value >= good) return 'text-green-600';
    if (value >= warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBurnRateColor = (rate: number) => {
    if (rate < 1) return 'text-green-600';
    if (rate < 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return 'text-green-600';
    if (latency < 200) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getErrorRateColor = (errorRate: number) => {
    if (errorRate < 0.1) return 'text-green-600';
    if (errorRate < 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all hover:border-blue-300">
      {/* Service Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <ServiceStatusBadge showIcon={true} size="md" status={service.status} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded ${getEnvironmentColor(service.environment)}`}
                >
                  {service.environment}
                </span>
                <span className="text-xs text-gray-500">{service.region}</span>
                <span className="text-xs text-gray-500">owner: {service.owner}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">{service.version}</div>
      </div>

      {/* Metrics Grid */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">P95 LATENCY</div>
            <div className={`text-lg font-bold ${getLatencyColor(service.responseTime)}`}>
              {service.responseTime} ms
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">ERROR RATE</div>
            <div className={`text-lg font-bold ${getErrorRateColor(service.errorRate)}`}>
              {service.errorRate}%
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">SLO BURN RATE</div>
            <div className={`text-lg font-bold ${getBurnRateColor(service.sloBurnRate)}`}>
              {service.sloBurnRate}x
            </div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-2">Response Time Trend</div>
          <div className="text-blue-500">
            <MiniSparkline data={service.trend} unit="ms" />
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Uptime</span>
            <span className={`font-semibold ${getMetricStatus(service.uptime, 99.9, 99.5)}`}>
              {service.uptime}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Security</span>
            <span className={`font-semibold ${getMetricStatus(service.securityScore, 95, 90)}`}>
              {service.securityScore}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Requests</span>
            <span className="font-semibold text-gray-900">
              {(service.requests / 1000).toFixed(0)}k
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">SLO</span>
            <span className={`font-semibold ${getMetricStatus(service.sloCompliance, 99, 97)}`}>
              {service.sloCompliance}%
            </span>
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      {service.recentIncidents.length > 0 && (
        <div className="px-6 pb-4">
          <div className="text-xs font-medium text-gray-700 mb-2">Recent Incidents</div>
          {service.recentIncidents.map((incident, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs mb-1"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded font-medium">
                  {incident.severity}
                </span>
                <span className="text-gray-900">{incident.title}</span>
              </div>
              <span className="text-gray-500">{incident.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end mt-auto px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between rounded-b-lg">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>Last deploy: {service.lastDeployment}</span>
        </div>
        <button
          className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          onClick={() => onDetailsClick?.(service)}
        >
          Details
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
