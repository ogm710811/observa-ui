import {
  CircleQuestionMark,
  FileStack,
  Info,
  LifeBuoy,
  LogOut,
  Moon,
  Settings,
  Sun,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { useTheme } from '@/contexts/ThemeContext';
import { User } from '@/types/dashboard';

interface HeaderProps {
  user: User | null;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onMenuClick }) => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  // const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  // const [notifications, setNotifications] = useState<Notification[]>([
  //   {
  //     id: '1',
  //     title: 'Deployment Completed',
  //     message: 'Service deployment completed for Payment API',
  //     time: '5 minutes ago',
  //     read: false,
  //     type: 'success',
  //   },
  //   {
  //     id: '2',
  //     title: 'System Warning',
  //     message: 'High CPU utilization detected on server cluster',
  //     time: '30 minutes ago',
  //     read: false,
  //     type: 'warning',
  //   },
  //   {
  //     id: '3',
  //     title: 'New Feature Released',
  //     message: 'Analytics dashboard v2.0 is now available',
  //     time: '2 hours ago',
  //     read: false,
  //     type: 'info',
  //   },
  // ]);
  const { isDarkMode, toggleTheme } = useTheme();

  const profileRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  // const notificationsRef = useRef<HTMLDivElement>(null);

  // Get unread notifications count
  // const unreadCount = notifications.filter(n => !n.read).length;
  //
  // const handleMarkAsRead = (id: string) => {
  //   setNotifications(
  //     notifications.map(notification =>
  //       notification.id === id ? { ...notification, read: true } : notification
  //     )
  //   );
  // };
  //
  // const handleMarkAllAsRead = () => {
  //   setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  // };
  //
  // const handleRemoveNotification = (id: string) => {
  //   setNotifications(notifications.filter(notification => notification.id !== id));
  // };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setIsSupportOpen(false);
      }
      // if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
      //   setIsNotificationsOpen(false);
      // }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get icon for the notification type
  // const getNotificationIcon = (type: Notification['type']) => {
  //   switch (type) {
  //     case 'success':
  //       return (
  //         <div className="p-2 rounded-full bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-300">
  //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path
  //               d="M5 13l4 4L19 7"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //             />
  //           </svg>
  //         </div>
  //       );
  //     case 'warning':
  //       return (
  //         <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-500 dark:text-yellow-300">
  //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path
  //               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //             />
  //           </svg>
  //         </div>
  //       );
  //     case 'error':
  //       return (
  //         <div className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300">
  //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path
  //               d="M6 18L18 6M6 6l12 12"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //             />
  //           </svg>
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-300">
  //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path
  //               d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth={2}
  //             />
  //           </svg>
  //         </div>
  //       );
  //   }
  // };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <div className="h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              aria-label="Toggle menu"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={onMenuClick}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-10 bg-gradient-to-br from-primary to-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">C1S</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Portal Hub</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tech Ecosystem Dashboard</p>
              </div>
            </div>
          </div>

          {/* Center Section - Search */}
          {/*<div className="hidden md:flex flex-1 max-w-xl mx-8">*/}
          {/*  <div className="relative w-full">*/}
          {/*    <input*/}
          {/*      className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"*/}
          {/*      placeholder="Search tools, services, or documentation..."*/}
          {/*      type="text"*/}
          {/*      value={searchQuery}*/}
          {/*      onChange={e => setSearchQuery(e.target.value)}*/}
          {/*    />*/}
          {/*    <svg*/}
          {/*      className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"*/}
          {/*      fill="none"*/}
          {/*      stroke="currentColor"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*    >*/}
          {/*      <path*/}
          {/*        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        strokeWidth={2}*/}
          {/*      />*/}
          {/*    </svg>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <Moon />
              ) : (
                // <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                //   <path
                //     d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //     strokeWidth={2}
                //   />
                // </svg>
                <Sun />
                // <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                //   <path
                //     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                //     strokeLinecap="round"
                //     strokeLinejoin="round"
                //     strokeWidth={2}
                //   />
                // </svg>
              )}
            </button>

            {/* Notifications */}
            {/*<div ref={notificationsRef} className="relative">*/}
            {/*  <button*/}
            {/*    aria-label="Notifications"*/}
            {/*    className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"*/}
            {/*    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}*/}
            {/*  >*/}
            {/*    <Bell />*/}
            {/*    /!*<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">*!/*/}
            {/*    /!*  <path*!/*/}
            {/*    /!*    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"*!/*/}
            {/*    /!*    strokeLinecap="round"*!/*/}
            {/*    /!*    strokeLinejoin="round"*!/*/}
            {/*    /!*    strokeWidth={2}*!/*/}
            {/*    /!*  />*!/*/}
            {/*    /!*</svg>*!/*/}
            {/*    {unreadCount > 0 && (*/}
            {/*      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">*/}
            {/*        {unreadCount}*/}
            {/*      </span>*/}
            {/*    )}*/}
            {/*  </button>*/}

            {/*  /!* Notifications Dropdown *!/*/}
            {/*  {isNotificationsOpen && (*/}
            {/*    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">*/}
            {/*      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">*/}
            {/*        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">*/}
            {/*          Notifications*/}
            {/*        </h3>*/}
            {/*        <button*/}
            {/*          className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"*/}
            {/*          onClick={handleMarkAllAsRead}*/}
            {/*        >*/}
            {/*          Mark all as read*/}
            {/*        </button>*/}
            {/*      </div>*/}

            {/*      {notifications.length === 0 ? (*/}
            {/*        <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">*/}
            {/*          <svg*/}
            {/*            className="w-6 h-6 mx-auto mb-2 text-gray-400"*/}
            {/*            fill="none"*/}
            {/*            stroke="currentColor"*/}
            {/*            viewBox="0 0 24 24"*/}
            {/*          >*/}
            {/*            <path*/}
            {/*              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"*/}
            {/*              strokeLinecap="round"*/}
            {/*              strokeLinejoin="round"*/}
            {/*              strokeWidth={2}*/}
            {/*            />*/}
            {/*          </svg>*/}
            {/*          No notifications*/}
            {/*        </div>*/}
            {/*      ) : (*/}
            {/*        <div className="max-h-80 overflow-y-auto">*/}
            {/*          {notifications.map(notification => (*/}
            {/*            <div*/}
            {/*              key={notification.id}*/}
            {/*              className={`px-4 py-3 flex items-start hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}*/}
            {/*            >*/}
            {/*              <div className="flex-shrink-0 mr-3 mt-1">*/}
            {/*                {getNotificationIcon(notification.type)}*/}
            {/*              </div>*/}
            {/*              <div className="flex-1 min-w-0">*/}
            {/*                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">*/}
            {/*                  {notification.title}*/}
            {/*                </p>*/}
            {/*                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">*/}
            {/*                  {notification.message}*/}
            {/*                </p>*/}
            {/*                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">*/}
            {/*                  {notification.time}*/}
            {/*                </p>*/}
            {/*              </div>*/}
            {/*              <div className="ml-3 flex-shrink-0 flex flex-col space-y-2">*/}
            {/*                {!notification.read && (*/}
            {/*                  <button*/}
            {/*                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800"*/}
            {/*                    onClick={() => handleMarkAsRead(notification.id)}*/}
            {/*                  >*/}
            {/*                    Mark as read*/}
            {/*                  </button>*/}
            {/*                )}*/}
            {/*                <button*/}
            {/*                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600"*/}
            {/*                  onClick={() => handleRemoveNotification(notification.id)}*/}
            {/*                >*/}
            {/*                  Dismiss*/}
            {/*                </button>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*          ))}*/}
            {/*        </div>*/}
            {/*      )}*/}

            {/*      <div className="border-t border-gray-200 dark:border-gray-700 mt-1">*/}
            {/*        <a*/}
            {/*          className="block px-4 py-2 text-sm text-center text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"*/}
            {/*          href="#notifications"*/}
            {/*        >*/}
            {/*          View all notifications*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}

            {/* Support Dropdown */}
            <div ref={supportRef} className="relative">
              <button
                aria-label="Support menu"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsSupportOpen(!isSupportOpen)}
              >
                <CircleQuestionMark />
                {/*<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                {/*  <path*/}
                {/*    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"*/}
                {/*    strokeLinecap="round"*/}
                {/*    strokeLinejoin="round"*/}
                {/*    strokeWidth={2}*/}
                {/*  />*/}
                {/*</svg>*/}
              </button>

              {isSupportOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <a
                    className="flex gap-2 items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    href="#123"
                  >
                    <FileStack size={20} />
                    {/*<svg*/}
                    {/*  className="w-5 h-5 mr-3 text-gray-400"*/}
                    {/*  fill="none"*/}
                    {/*  stroke="currentColor"*/}
                    {/*  viewBox="0 0 24 24"*/}
                    {/*>*/}
                    {/*  <path*/}
                    {/*    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"*/}
                    {/*    strokeLinecap="round"*/}
                    {/*    strokeLinejoin="round"*/}
                    {/*    strokeWidth={2}*/}
                    {/*  />*/}
                    {/*</svg>*/}
                    <span className="text-gray-700 dark:text-gray-200 text-sm">Documentation</span>
                  </a>
                  <a
                    className="flex gap-2 items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    href="#123"
                  >
                    <LifeBuoy size={20} />
                    {/*<svg*/}
                    {/*  className="w-5 h-5 mr-3 text-gray-400"*/}
                    {/*  fill="none"*/}
                    {/*  stroke="currentColor"*/}
                    {/*  viewBox="0 0 24 24"*/}
                    {/*>*/}
                    {/*  <path*/}
                    {/*    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"*/}
                    {/*    strokeLinecap="round"*/}
                    {/*    strokeLinejoin="round"*/}
                    {/*    strokeWidth={2}*/}
                    {/*  />*/}
                    {/*</svg>*/}
                    <span className="text-gray-700 dark:text-gray-200 text-sm">Get Help</span>
                  </a>
                  <a
                    className="flex gap-2 items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    href="#123"
                  >
                    <Info size={20} />
                    {/*<svg*/}
                    {/*  className="w-5 h-5 mr-3 text-gray-400"*/}
                    {/*  fill="none"*/}
                    {/*  stroke="currentColor"*/}
                    {/*  viewBox="0 0 24 24"*/}
                    {/*>*/}
                    {/*  <path*/}
                    {/*    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"*/}
                    {/*    strokeLinecap="round"*/}
                    {/*    strokeLinejoin="round"*/}
                    {/*    strokeWidth={2}*/}
                    {/*  />*/}
                    {/*</svg>*/}
                    <span className="text-gray-700 dark:text-gray-200 text-sm">FAQ</span>
                  </a>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div ref={profileRef} className="relative">
              <button
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#013d5b] to-[#0369a1] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {user?.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.employeeId}</p>
                </div>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <div className="flex gap-2 items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    {/*<CircleUserRound />*/}
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  {/*<a*/}
                  {/*  className="flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"*/}
                  {/*  href="#123"*/}
                  {/*>*/}
                  {/*  <svg*/}
                  {/*    className="w-5 h-5 mr-3 text-gray-400"*/}
                  {/*    fill="none"*/}
                  {/*    stroke="currentColor"*/}
                  {/*    viewBox="0 0 24 24"*/}
                  {/*  >*/}
                  {/*    <path*/}
                  {/*      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"*/}
                  {/*      strokeLinecap="round"*/}
                  {/*      strokeLinejoin="round"*/}
                  {/*      strokeWidth={2}*/}
                  {/*    />*/}
                  {/*  </svg>*/}
                  {/*  <span className="text-gray-700 dark:text-gray-200">View Profile</span>*/}
                  {/*</a>*/}
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <a
                      className="flex gap-2 items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      href="#123"
                    >
                      {/*<svg*/}
                      {/*  className="w-5 h-5 mr-3 text-gray-400"*/}
                      {/*  fill="none"*/}
                      {/*  stroke="currentColor"*/}
                      {/*  viewBox="0 0 24 24"*/}
                      {/*>*/}
                      {/*  <path*/}
                      {/*    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"*/}
                      {/*    strokeLinecap="round"*/}
                      {/*    strokeLinejoin="round"*/}
                      {/*    strokeWidth={2}*/}
                      {/*  />*/}
                      {/*  <path*/}
                      {/*    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"*/}
                      {/*    strokeLinecap="round"*/}
                      {/*    strokeLinejoin="round"*/}
                      {/*    strokeWidth={2}*/}
                      {/*  />*/}
                      {/*</svg>*/}
                      <Settings />
                      <span className="text-gray-700 dark:text-gray-200 text-sm">Settings</span>
                    </a>
                  </div>
                  <a
                    className="flex gap-2 items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    href="#123"
                  >
                    {/*<svg*/}
                    {/*  className="w-5 h-5 mr-3 text-gray-400"*/}
                    {/*  fill="none"*/}
                    {/*  stroke="currentColor"*/}
                    {/*  viewBox="0 0 24 24"*/}
                    {/*>*/}
                    {/*  <path*/}
                    {/*    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"*/}
                    {/*    strokeLinecap="round"*/}
                    {/*    strokeLinejoin="round"*/}
                    {/*    strokeWidth={2}*/}
                    {/*  />*/}
                    {/*</svg>*/}
                    <LogOut />
                    <span className="text-gray-700 dark:text-gray-200 text-sm">Sign Out</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
