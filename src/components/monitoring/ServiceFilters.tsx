import { ChevronDown, Filter, Search } from 'lucide-react';
import React from 'react';

import { FilterOptions, ServiceCategory, ServiceEnvironment } from '@/types/monitoring';

export interface ServiceFiltersProps {
  filters: FilterOptions;
  categories: (ServiceCategory | 'all')[];
  environments: (ServiceEnvironment | 'all')[];
  onFiltersChange: (filters: FilterOptions) => void;
}

const ServiceFilters = ({
  filters,
  categories,
  environments,
  onFiltersChange,
}: ServiceFiltersProps) => {
  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleStatusChange = (status: typeof filters.status) => {
    onFiltersChange({ ...filters, status });
  };

  const handleEnvironmentChange = (environment: typeof filters.environment) => {
    onFiltersChange({ ...filters, environment });
  };

  const handleCategoryChange = (category: typeof filters.category) => {
    onFiltersChange({ ...filters, category });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search services..."
            type="text"
            value={filters.search}
            onChange={e => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={filters.status}
            onChange={e => handleStatusChange(e.target.value as typeof filters.status)}
          >
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="down">Down</option>
            <option value="unknown">Unknown</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>

        {/* Environment Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={filters.environment}
            onChange={e => handleEnvironmentChange(e.target.value as typeof filters.environment)}
          >
            {environments.map(env => (
              <option key={env} value={env}>
                {env === 'all' ? 'All Environments' : env.toUpperCase()}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            value={filters.category}
            onChange={e => handleCategoryChange(e.target.value as typeof filters.category)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ServiceFilters;
