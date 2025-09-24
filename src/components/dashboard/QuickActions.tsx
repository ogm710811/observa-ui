import React from 'react';

import { QuickAction } from '@/types/user';

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className="flex items-center justify-center space-x-2 p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {action.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
