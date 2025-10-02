import { Activity } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import Breadcrumb from '@/components/common/Breadcrumb';
import PageHeader from '@/components/common/PageHeader';
import ServiceCard from '@/components/monitoring/ServiceCard';
import ServiceFilters from '@/components/monitoring/ServiceFilters';
import ServiceTable from '@/components/monitoring/ServiceTable';
import { mockServices } from '@/mock/ServicesMockData';
import { FilterOptions, Service, ServiceCategory, ServiceEnvironment } from '@/types/monitoring';
import { BreadcrumbItem, Header } from '@/types/pages';

const pageHeader: Header = {
  title: 'Service Monitoring',
  subtitle: 'Real-time metrics by service',
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Monitoring' }, // current page, not a link
];

const Monitoring: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    status: 'all',
    environment: 'all',
    category: 'all',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortField, setSortField] = useState<keyof Service>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Compute available filter options
  const categories = useMemo<(ServiceCategory | 'all')[]>(() => {
    return ['all', ...new Set(mockServices.map(s => s.category as ServiceCategory))];
  }, []);

  const environments = useMemo<(ServiceEnvironment | 'all')[]>(() => {
    return ['all', ...new Set(mockServices.map(s => s.environment as ServiceEnvironment))];
  }, []);

  // Filter and sort services
  const filteredServices = useMemo(() => {
    let filtered = mockServices.filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || service.status === filters.status;
      const matchesCategory = filters.category === 'all' || service.category === filters.category;
      const matchesEnvironment =
        filters.environment === 'all' || service.environment === filters.environment;
      return matchesSearch && matchesStatus && matchesCategory && matchesEnvironment;
    });

    // Sort
    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const comparison = aVal.localeCompare(bVal);
          return sortDirection === 'asc' ? comparison : -comparison;
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          const comparison = aVal - bVal;
          return sortDirection === 'asc' ? comparison : -comparison;
        }

        return 0;
      });
    }

    return filtered;
  }, [filters, sortField, sortDirection]);

  const handleSort = (field: keyof Service) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader pageHeader={pageHeader} />

        {/* Breadcrumbs */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h1 className="text-lg text-gray-900 pr-1">Total:</h1>
              <p className="text-lg text-gray-600 pl-1">
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} tracked
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('grid')}
              >
                Grid View
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setViewMode('table')}
              >
                Table View
              </button>
            </div>
          </div>

          <ServiceFilters
            categories={categories}
            environments={environments}
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <ServiceTable
            services={filteredServices}
            sortDirection={sortDirection}
            sortField={sortField}
            onSort={handleSort}
          />
        )}

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Monitoring;
