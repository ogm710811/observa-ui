import React from 'react';

import ServiceStatusBadge from '@/components/observa-details/ServiceStatusBadge';
import SortableHeader from '@/components/observa-details/SortableHeader';
import { Service } from '@/types/monitoring';

interface ServiceTableProps {
  services: Service[];
  sortField: keyof Service;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Service) => void;
}

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  sortField,
  sortDirection,
  onSort,
}) => {
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <SortableHeader
                align="left"
                field="name"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                Service
              </SortableHeader>
              <SortableHeader
                field="status"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                Status
              </SortableHeader>
              <SortableHeader
                field="environment"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                Env
              </SortableHeader>
              <SortableHeader
                field="responseTime"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                P95
              </SortableHeader>
              <SortableHeader
                field="errorRate"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                Errors
              </SortableHeader>
              <SortableHeader
                field="sloBurnRate"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                Burn Rate
              </SortableHeader>
              <SortableHeader
                field="uptime"
                sortDirection={sortDirection}
                sortField={sortField}
                onSort={onSort}
              >
                Uptime
              </SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Version
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map(service => (
              <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <ServiceStatusBadge showIcon={true} size="sm" status={service.status} />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-xs text-gray-500">
                        {service.region} · owner: {service.owner}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full`}>
                    {service.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${getEnvironmentColor(service.environment)}`}
                  >
                    {service.environment}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-sm font-semibold ${getLatencyColor(service.responseTime)}`}
                  >
                    {service.responseTime}ms
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-sm font-semibold ${getErrorRateColor(service.errorRate)}`}>
                    {service.errorRate}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-sm font-semibold ${getBurnRateColor(service.sloBurnRate)}`}
                  >
                    {service.sloBurnRate}x
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`text-sm font-semibold ${getMetricStatus(service.uptime, 99.9, 99.5)}`}
                  >
                    {service.uptime}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs font-mono text-gray-600">{service.version}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
