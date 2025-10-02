import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import React from 'react';

import { ServiceStatus } from '@/types/monitoring';

interface ServiceStatusBadgeProps {
  status: ServiceStatus;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ServiceStatusBadge: React.FC<ServiceStatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md',
}) => {
  const getStatusIcon = (status: ServiceStatus) => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

    switch (status) {
      case 'healthy':
        return <CheckCircle className={`${sizeClass} text-green-500`} />;
      case 'warning':
        return <AlertTriangle className={`${sizeClass} text-yellow-500`} />;
      case 'down':
        return <XCircle className={`${sizeClass} text-red-500`} />;
      default:
        return <Activity className={`${sizeClass} text-gray-400`} />;
    }
  };

  const getStatusColor = (status: ServiceStatus) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'down':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && getStatusIcon(status)}
      <span
        className={`${sizeClasses[size]} font-medium rounded-full border ${getStatusColor(status)}`}
      >
        {status.toUpperCase()}
      </span>
    </div>
  );
};

export default ServiceStatusBadge;
