'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const mockReports = [
  {
    id: 1,
    name: 'Blood Test',
    patient: 'Amit Sharma',
    doctor: 'Dr. Neha Singh',
    date: '2024-06-09',
    status: 'Ready',
  },
  {
    id: 2,
    name: 'X-Ray Chest',
    patient: 'Priya Verma',
    doctor: 'Dr. Rajeev Kumar',
    date: '2024-06-08',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'MRI Brain',
    patient: 'Rohit Gupta',
    doctor: 'Dr. Neha Singh',
    date: '2024-06-07',
    status: 'Ready',
  },
  {
    id: 4,
    name: 'ECG',
    patient: 'Sunita Yadav',
    doctor: 'Dr. Rajeev Kumar',
    date: '2024-06-06',
    status: 'Pending',
  },
];

const statusColors: Record<string, string> = {
  Ready: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
};

const reportTypes = ['All', 'Blood Test', 'X-Ray Chest', 'MRI Brain', 'ECG'];

export default function ReportsPage() {
  const [type, setType] = useState('All');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [search, setSearch] = useState('');

  const filtered = mockReports.filter(report =>
    (type === 'All' || report.name === type) &&
    (!from || report.date >= from) &&
    (!to || report.date <= to) &&
    (report.patient.toLowerCase().includes(search.toLowerCase()) ||
      report.doctor.toLowerCase().includes(search.toLowerCase()) ||
      report.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
          <input
            type="date"
            className="border border-gray-300 rounded px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={from}
            onChange={e => setFrom(e.target.value)}
            placeholder="From"
          />
          <span className="text-gray-400">-</span>
          <input
            type="date"
            className="border border-gray-300 rounded px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="To"
          />
          <select
            className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            {reportTypes.map(rt => (
              <option key={rt} value={rt}>{rt}</option>
            ))}
          </select>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search report, patient, doctor..."
              className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full shadow-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-2 text-left font-semibold">Report Name</th>
              <th className="px-4 py-2 text-left font-semibold">Patient</th>
              <th className="px-4 py-2 text-left font-semibold">Doctor</th>
              <th className="px-4 py-2 text-left font-semibold">Date</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-6 text-gray-400">No reports found.</td></tr>
            ) : (
              filtered.map(report => (
                <tr key={report.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-blue-900 flex items-center gap-2"><DocumentTextIcon className="w-5 h-5 text-blue-400" />{report.name}</td>
                  <td className="px-4 py-2">{report.patient}</td>
                  <td className="px-4 py-2">{report.doctor}</td>
                  <td className="px-4 py-2">{report.date}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[report.status]}`}>{report.status}</span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-600 hover:bg-blue-50 p-1 rounded" title="View"><EyeIcon className="w-5 h-5" /></button>
                    <button className="text-green-600 hover:bg-green-50 p-1 rounded" title="Download"><ArrowDownTrayIcon className="w-5 h-5" /></button>
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