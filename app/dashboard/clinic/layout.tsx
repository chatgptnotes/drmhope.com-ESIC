'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clinicSidebarRoutes } from '../clinicSidebarConfig';
import {
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const icons = {
  HomeIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
};

export default function ClinicLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-white shadow flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2">
          <button className="sm:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
          <span className="font-bold text-lg text-gray-800">Clinic Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Add user avatar or profile dropdown here if needed */}
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed sm:static z-40 top-16 left-0 h-full sm:h-auto w-64 bg-white border-r shadow-sm transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
          <nav className="flex flex-col py-4">
            {clinicSidebarRoutes.map(route => {
              const Icon = icons[route.icon as keyof typeof icons];
              const active = pathname === route.path;
              return (
                <Link key={route.path} href={route.path} className={`flex items-center gap-3 px-6 py-3 text-sm font-medium rounded-l-full transition-colors ${active ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setSidebarOpen(false)}>
                  <Icon className="w-5 h-5" />
                  {route.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 ml-0 sm:ml-64 transition-all duration-200">
          {children}
        </main>
      </div>
    </div>
  );
} 