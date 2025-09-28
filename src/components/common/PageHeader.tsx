import React from 'react';

import { Header } from '@/types/pages';

interface PageHeaderProps {
  pageHeader: Header;
}

const PageHeader = ({ pageHeader }: PageHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{pageHeader.title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{pageHeader.subtitle}</p>
    </div>
  );
};

export default PageHeader;
