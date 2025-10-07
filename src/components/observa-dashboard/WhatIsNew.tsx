import { CircleSmall } from 'lucide-react';
import React from 'react';

import { News } from '@/types/dashboard';

interface WhatIsNewProps {
  news: News[];
}

const WhatIsNew = ({ news }: WhatIsNewProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What’s New</h2>
      {news.map((newItem, i) => (
        <div
          key={i}
          className="flex items-center gap-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <CircleSmall className="fill-primary text-primary dark:fill-black" size={14} />
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">{newItem.text}</p>
          </div>
        </div>
      ))}
      <p className="text-xs pt-4">
        <span className="dark:text-white">
          For the list of changes included in this version, refer to the{' '}
        </span>
        <a
          className="text-primary dark:text-white dark:hover:text-blue-400 underline underline-offset-4"
          href="#123"
        >
          <span>release notes</span>
        </a>
        .
      </p>
    </div>
  );
};

export default WhatIsNew;
