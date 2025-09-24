import { ChartNoAxesCombined, ChevronsLeft, FileStack, UserPlus } from 'lucide-react';
import React, { useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tool } from '@/types/user';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const tools: Tool[] = [
    {
      id: '1',
      name: 'Demo Tenant',
      url: '#api-gateway',
      icon: <UserPlus />,
      category: 'Infrastructure',
    },
    {
      id: '4',
      name: 'Monitoring',
      url: '#monitoring',
      icon: <ChartNoAxesCombined />,
      category: 'Observability',
    },
    { id: '8', name: 'Documentation', url: '#docs', icon: <FileStack />, category: 'Resources' },
    // { id: '2', name: 'Service Mesh', url: '#service-mesh', icon: '🕸️', category: 'Infrastructure' },
    // { id: '1', name: 'API Gateway', url: '#api-gateway', icon: '🔌', category: 'Infrastructure' },
    // { id: '2', name: 'Service Mesh', url: '#service-mesh', icon: '🕸️', category: 'Infrastructure' },
    // { id: '3', name: 'CI/CD Pipeline', url: '#cicd', icon: '🚀', category: 'DevOps' },
    // { id: '5', name: 'Log Analytics', url: '#logs', icon: '📝', category: 'Observability' },
    // { id: '6', name: 'Security Scanner', url: '#security', icon: '🔒', category: 'Security' },
    // { id: '7', name: 'Cost Optimizer', url: '#costs', icon: '💰', category: 'FinOps' },
  ];

  const categories = ['all', ...Array.from(new Set(tools.map(t => t.category || '')))];
  const filteredTools =
    activeCategory === 'all' ? tools : tools.filter(t => t.category === activeCategory);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          role="button"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClose();
            }
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 h-[calc(100vh-64px)] bg-white dark:bg-gray-800 shadow-xl z-40
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              aria-label="Toggle sidebar"
              className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={onToggleCollapse}
            >
              <ChevronsLeft className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
              {/*<svg*/}
              {/*  className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}*/}
              {/*  fill="none"*/}
              {/*  stroke="currentColor"*/}
              {/*  viewBox="0 0 24 24"*/}
              {/*>*/}
              {/*  <path*/}
              {/*    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"*/}
              {/*    strokeLinecap="round"*/}
              {/*    strokeLinejoin="round"*/}
              {/*    strokeWidth={2}*/}
              {/*  />*/}
              {/*</svg>*/}
            </button>
          </div>

          {/* Category Filter */}
          {!isCollapsed && (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <label
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
                htmlFor="category"
              >
                Categories
              </label>
              <select
                className="mt-2 w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="category"
                name="category"
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Tools List */}
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-2">
                {filteredTools.map(tool => (
                  <li key={tool.id}>
                    {/*<a*/}
                    {/*  className={`*/}
                    {/*    flex items-center px-3 py-3 rounded-lg*/}
                    {/*    hover:bg-blue-50 dark:hover:bg-gray-700*/}
                    {/*    transition-all duration-200*/}
                    {/*    group relative*/}
                    {/*  `}*/}
                    {/*  href={tool.url}*/}
                    {/*>*/}
                    {/*  <span className="text-2xl mr-3">{tool.icon}</span>*/}
                    {/*  {!isCollapsed && (*/}
                    {/*    <div className="flex-1">*/}
                    {/*      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">*/}
                    {/*        {tool.name}*/}
                    {/*      </p>*/}
                    {/*      <p className="text-xs text-gray-500 dark:text-gray-400">{tool.category}</p>*/}
                    {/*    </div>*/}
                    {/*  )}*/}
                    {/*  {isCollapsed && (*/}
                    {/*    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">*/}
                    {/*      {tool.name}*/}
                    {/*    </div>*/}
                    {/*  )}*/}
                    {/*</a>*/}

                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            className={`
                        flex items-center px-3 py-3 rounded-lg
                        hover:bg-blue-50 dark:hover:bg-gray-700
                        transition-all duration-200
                        group relative
                      `}
                            href={tool.url}
                          >
                            <span className="text-2xl">{tool.icon}</span>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent
                          className="bg-gray-800 text-white"
                          side="right"
                          sideOffset={8}
                        >
                          {tool.name}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <a
                        className="flex items-center px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 group relative"
                        href={tool.url}
                      >
                        <span className="text-2xl mr-3">{tool.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tool.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {tool.category}
                          </p>
                        </div>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </TooltipProvider>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!isCollapsed ? (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <p>Portal Hub v1.0.0</p>
                <p className="mt-1">© 2025 C1S Capital One</p>
              </div>
            ) : (
              <div className="text-center text-xs text-gray-500">v1.0</div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
