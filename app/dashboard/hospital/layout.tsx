'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, HomeIcon, UserGroupIcon, CalendarIcon, DocumentTextIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const routes = [
  { name: 'Dashboard', href: '/dashboard/hospital', icon: HomeIcon },
  { name: 'Patients', href: '/dashboard/hospital/patients', icon: UserGroupIcon },
  { name: 'Appointments', href: '/dashboard/hospital/appointments', icon: CalendarIcon },
  { name: 'Reports', href: '/dashboard/hospital/reports', icon: DocumentTextIcon },
  { name: 'Settings', href: '/dashboard/hospital/settings', icon: Cog6ToothIcon },
];

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Hospital Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <nav className="mt-4">
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <Link key={route.href} href={route.href} className={`flex items-center gap-2 p-4 hover:bg-gray-100 ${pathname === route.href ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}>
                <Icon className="w-5 h-5" />
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Bars3Icon className="w-6 h-6 text-gray-500" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 