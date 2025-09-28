import { CircleSmall } from 'lucide-react';
import React from 'react';

import { RecentActivity } from '@/types/dashboard';

interface RecentActivityProps {
  activities: RecentActivity[];
}

export const RecentActivities: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
      {/*<div className="space-y-3">*/}
      {activities.map((activity, i) => (
        <div
          key={i}
          className="flex items-start gap-2 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {/*<div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>*/}

          <CircleSmall className="mt-1 fill-primary text-primary dark:fill-black" size={14} />
          <div className="flex-1">
            <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
      {/*</div>*/}
    </div>
  );
};
