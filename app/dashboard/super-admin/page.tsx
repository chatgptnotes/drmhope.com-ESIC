'use client';

import { PresentationChartBarIcon, UserGroupIcon, BuildingOffice2Icon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const stats = [
  {
    label: 'Hospitals',
    value: 12,
    icon: BuildingOffice2Icon,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    label: 'Clinics',
    value: 34,
    icon: PresentationChartBarIcon,
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    label: 'Admins',
    value: 5,
    icon: UserGroupIcon,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

export default function SuperAdminDashboard() {
  const [growth] = useState([20, 40, 35, 50, 70, 65, 90]);
  const points = growth
    .map((v, i) => `${(i / (growth.length - 1)) * 300},${100 - v}`)
    .join(' ');

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`rounded-lg shadow p-4 flex items-center gap-3 ${bg}`}>
            <Icon className={`w-8 h-8 ${color}`} />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Weekly User Growth</h2>
          <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
        </div>
        <svg viewBox="0 0 300 100" className="w-full h-24">
          <polyline
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
}
