import { ChartNoAxesCombined, ChevronsLeft, FileStack, UserPlus, Warehouse } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tool } from '@/types/dashboard';

interface NavbarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const [activeCategory] = useState('all');

  const tools: Tool[] = [
    {
      id: '0',
      name: 'Home',
      url: '/',
      icon: <Warehouse />,
      category: '',
    },
    {
      id: '1',
      name: 'Observability',
      url: '/observability',
      icon: <ChartNoAxesCombined />,
      category: '',
    },
    {
      id: '2',
      name: 'Demo',
      url: '#api-gateway',
      icon: <UserPlus />,
      category: '',
    },
    { id: '3', name: 'Documentation', url: '#docs', icon: <FileStack />, category: '' },
  ];

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
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${isCollapsed ? 'w-20' : 'w-64'}
        `}
        style={{
          // Prevents main thread layout animation - use only transform, not width for slide-in/out
          willChange: 'transform',
        }}
      >
        <div className="flex flex-col h-full relative">
          {/* Tools List */}
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <nav className="flex-1 overflow-y-auto px-4 py-8">
              <ul className="space-y-2">
                {filteredTools.map(tool => (
                  <li key={tool.id}>
                    {isCollapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            className="flex items-center px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group relative"
                            to={tool.url}
                          >
                            <span className="text-2xl">{tool.icon}</span>
                          </Link>
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
                        className="flex items-center px-3 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors group relative"
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

          <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <button
                aria-label="Toggle sidebar"
                className="hidden lg:flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={onToggleCollapse}
              >
                <ChevronsLeft
                  className={`transition-transform duration-500 ease-in-out ${isCollapsed ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="relative border-t border-gray-200 dark:border-gray-700 flex flex-col items-center h-16 justify-center p-0 m-0">
            <div className="flex flex-col items-center justify-center w-full h-full px-4">
              {/* Fade or cross-fade content if preferred */}
              <div className="w-full h-full flex items-center justify-center">
                {!isCollapsed ? (
                  <div
                    className={`text-xs text-gray-500 dark:text-gray-400 ${isCollapsed ? 'text-center' : 'text-start'}`}
                  >
                    <p>Portal Hub v1.0.0</p>
                    <p className="mt-1">© 2025 C1S Capital One</p>
                  </div>
                ) : (
                  <div className="text-center text-xs text-gray-500 w-full">v1.0</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
