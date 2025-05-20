'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const mockAppointments = [
  {
    id: 1,
    patient: 'Amit Sharma',
    doctor: 'Dr. Neha Singh',
    date: '2024-06-10',
    time: '10:00 AM',
    status: 'Confirmed',
  },
  {
    id: 2,
    patient: 'Priya Verma',
    doctor: 'Dr. Rajeev Kumar',
    date: '2024-06-10',
    time: '11:30 AM',
    status: 'Pending',
  },
  {
    id: 3,
    patient: 'Rohit Gupta',
    doctor: 'Dr. Neha Singh',
    date: '2024-06-10',
    time: '12:00 PM',
    status: 'Cancelled',
  },
  {
    id: 4,
    patient: 'Sunita Yadav',
    doctor: 'Dr. Rajeev Kumar',
    date: '2024-06-10',
    time: '01:00 PM',
    status: 'Confirmed',
  },
];

const statusColors: Record<string, string> = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
};

export default function AppointmentsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = mockAppointments.filter(app =>
    (status === 'All' || app.status === status) &&
    (app.patient.toLowerCase().includes(search.toLowerCase()) ||
      app.doctor.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search patient or doctor..."
              className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full shadow-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
          </div>
          <select
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-2 text-left font-semibold">Patient</th>
              <th className="px-4 py-2 text-left font-semibold">Doctor</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-4 py-2 text-left font-semibold">Time</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-6 text-gray-400">No appointments found.</td></tr>
            ) : (
              filtered.map(app => (
                <tr key={app.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-blue-900">{app.patient}</td>
                  <td className="px-4 py-2">{app.doctor}</td>
                  <td className="px-4 py-2">{app.date}</td>
                  <td className="px-4 py-2">{app.time}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[app.status]}`}>{app.status}</span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-600 hover:bg-blue-50 p-1 rounded" title="View"><EyeIcon className="w-5 h-5" /></button>
                    <button className="text-yellow-600 hover:bg-yellow-50 p-1 rounded" title="Edit"><PencilIcon className="w-5 h-5" /></button>
                    <button className="text-red-600 hover:bg-red-50 p-1 rounded" title="Delete"><TrashIcon className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 