import Breadcrumb from '@/components/common/Breadcrumb';
import PageHeader from '@/components/common/PageHeader';
import { BreadcrumbItem, Header } from '@/types/pages';

const pageHeader: Header = {
  title: 'Service Monitoring',
  subtitle: 'Real-time metrics by service',
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Monitoring' }, // current page, not a link
];

const Monitoring = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader pageHeader={pageHeader} />

      {/* Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Monitoring;
