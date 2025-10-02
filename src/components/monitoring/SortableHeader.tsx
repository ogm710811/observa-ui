import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React from 'react';

interface SortableHeaderProps<T> {
  field: T;
  children: React.ReactNode;
  sortField: T;
  sortDirection: 'asc' | 'desc';
  onSort: (field: T) => void;
  align?: 'left' | 'center' | 'right';
}

function SortableHeader<T extends string>({
  field,
  children,
  sortField,
  sortDirection,
  onSort,
  align = 'center',
}: SortableHeaderProps<T>) {
  const isActive = sortField === field;

  const alignClasses = {
    left: 'text-left justify-start',
    center: 'text-center justify-center',
    right: 'text-right justify-end',
  };

  return (
    <th
      className={`px-6 py-3 ${alignClasses[align]} text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 transition-colors select-none`}
      onClick={() => onSort(field)}
    >
      <div
        className={`flex items-center gap-1 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : ''}`}
      >
        {children}
        {isActive ? (
          sortDirection === 'asc' ? (
            <ArrowUp className="w-4 h-4 text-blue-600" />
          ) : (
            <ArrowDown className="w-4 h-4 text-blue-600" />
          )
        ) : (
          <ArrowUpDown className="w-4 h-4 text-gray-400" />
        )}
      </div>
    </th>
  );
}

export default SortableHeader;
