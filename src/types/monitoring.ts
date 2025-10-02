export type ServiceStatus = 'healthy' | 'warning' | 'down' | 'unknown';

export type ServiceEnvironment = 'prod' | 'stage' | 'dev';

export type ServiceCategory =
  | 'Financial'
  | 'Security'
  | 'Infrastructure'
  | 'User Management'
  | 'Communication'
  | 'Storage';

export type IncidentSeverity = 'SEV1' | 'SEV2' | 'SEV3' | 'SEV4';

export type IncidentStatus = 'Open' | 'Mitigated' | 'Resolved' | 'Investigating';

export interface Incident {
  severity: IncidentSeverity;
  title: string;
  status: IncidentStatus;
  time: string;
}

export interface Service {
  id: number;
  name: string;
  category: ServiceCategory;
  status: ServiceStatus;
  environment: ServiceEnvironment;
  region: string;
  owner: string;
  version: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
  requests: number;
  lastDeployment: string;
  sloCompliance: number;
  sloBurnRate: number;
  securityScore: number;
  recentIncidents: Incident[];
  trend: number[];
}

export interface FilterOptions {
  search: string;
  status: ServiceStatus | 'all';
  environment: ServiceEnvironment | 'all';
  category: ServiceCategory | 'all';
}

export type SortDirection = 'asc' | 'desc';

export type SortableServiceField = keyof Service;

export interface ServiceSort {
  field: SortableServiceField;
  direction: SortDirection;
}

export type ViewMode = 'grid' | 'table';

export interface MetricThreshold {
  good: number;
  warning: number;
}

export const METRIC_THRESHOLDS = {
  uptime: { good: 99.9, warning: 99.5 },
  securityScore: { good: 95, warning: 90 },
  sloCompliance: { good: 99, warning: 97 },
  responseTime: { good: 100, warning: 200 },
  errorRate: { good: 0.1, warning: 1.0 },
  burnRate: { good: 1.0, warning: 3.0 },
} as const;

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ServicesResponse {
  services: Service[];
  total: number;
  page?: number;
  pageSize?: number;
}

export interface ServiceMetadata {
  categories: ServiceCategory[];
  environments: ServiceEnvironment[];
  regions: string[];
  owners: string[];
}
