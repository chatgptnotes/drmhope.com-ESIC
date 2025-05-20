'use client';

import { useState } from 'react';
import { CalendarDaysIcon, UserGroupIcon, UserIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

const statsConfig = [
  {
    label: 'Appointments Today',
    key: 'appointments',
    icon: CalendarDaysIcon,
    color: 'bg-blue-100 text-blue-800',
  },
  {
    label: 'New Patients',
    key: 'patients',
    icon: UserGroupIcon,
    color: 'bg-green-100 text-green-800',
  },
  {
    label: 'Doctors On Duty',
    key: 'doctors',
    icon: UserIcon,
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    label: 'Reports Pending',
    key: 'reports',
    icon: DocumentChartBarIcon,
    color: 'bg-purple-100 text-purple-800',
  },
];

export default function ClinicDashboard() {
  // Mock dynamic data (replace with API call as needed)
  const [stats] = useState({
    appointments: 120,
    patients: 45,
    doctors: 8,
    reports: 3,
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Welcome to the Clinic Dashboard!</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statsConfig.map(({ label, key, icon: Icon, color }) => (
          <div
            key={key}
            className={`flex items-center gap-3 p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-200 ${color} min-w-0`}
          >
            <div className="flex-shrink-0">
              <Icon className="w-8 h-8 opacity-80" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-2xl font-bold leading-tight truncate">{stats[key]}</span>
              <span className="text-xs font-medium opacity-80 truncate">{label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-6 max-w-2xl">
        <h3 className="text-lg font-semibold mb-2">Quick Overview</h3>
        <p className="text-gray-600">This is your clinic's main dashboard. Use the sidebar to navigate to Appointments, Patients, Reports, and Settings.</p>
      </div>
    </div>
  );
} 