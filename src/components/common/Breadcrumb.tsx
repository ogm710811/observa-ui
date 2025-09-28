import { ChevronRight } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { BreadcrumbItem } from '@/types/pages';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  maxItems?: number;
  showRoot?: boolean;
}

const Breadcrumb = ({
  items,
  separator = <ChevronRight className="text-gray-400" size={16} />,
  className = '',
  maxItems,
  showRoot = true,
}: BreadcrumbProps) => {
  if (!items || items.length === 0) {
    return null;
  }

  const filteredItems = showRoot ? items : items.slice(1);

  let displayItems = filteredItems;
  if (maxItems && filteredItems.length > maxItems) {
    const startItems = filteredItems.slice(0, 1);
    const endItems = filteredItems.slice(-(maxItems - 1));
    displayItems = [...startItems, { label: '...', id: 'ellipsis' }, ...endItems];
  }

  return (
    <nav aria-label="Breadcrumb navigation" className={`flex ${className}`} role="navigation">
      <ol className="inline-flex items-center space-x-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';
          const key = item.id || `${item.label}-${index}`;

          return (
            <li key={key} className="inline-flex items-center">
              {isEllipsis ? (
                <>
                  <span aria-hidden="true" className="text-gray-400 dark:text-gray-500 px-2">
                    {item.label}
                  </span>
                  {!isLast && (
                    <span aria-hidden="true" className="text-gray-400 dark:text-gray-500">
                      {separator}
                    </span>
                  )}
                </>
              ) : isLast ? (
                <span aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">
                  {item.label}
                </span>
              ) : (
                <>
                  {item.href ? (
                    <Link
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150"
                      to={item.href}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
                  )}
                  <span aria-hidden="true" className="mx-2 text-gray-400 dark:text-gray-500">
                    {separator}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
