import React from 'react';

import { QuickLink } from '@/types/user';

interface QuickLinksProps {
  links: QuickLink[];
}

const QuickLinks = ({ links }: QuickLinksProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h2>
      <div className="grid grid-cols-2 gap-6">
        {links.map((link, i) => (
          <a
            key={i}
            className="flex items-center px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 group relative"
            href={link.url}
          >
            <span className="text-2xl mr-3">{link.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {link.text}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
