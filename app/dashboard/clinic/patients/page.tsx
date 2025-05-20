'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const mockPatients = [
  {
    id: 1,
    name: 'Amit Sharma',
    age: 32,
    gender: 'Male',
    phone: '9876543210',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Priya Verma',
    age: 28,
    gender: 'Female',
    phone: '9123456780',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Rohit Gupta',
    age: 40,
    gender: 'Male',
    phone: '9988776655',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Sunita Yadav',
    age: 36,
    gender: 'Female',
    phone: '9090909090',
    status: 'Active',
  },
];

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-700',
};

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = mockPatients.filter(patient =>
    (status === 'All' || patient.status === status) &&
    (patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search))
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Patients</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search name or phone..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Age</th>
              <th className="px-4 py-2 text-left font-semibold">Gender</th>
              <th className="px-4 py-2 text-left font-semibold">Phone</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-6 text-gray-400">No patients found.</td></tr>
            ) : (
              filtered.map(patient => (
                <tr key={patient.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-blue-900">{patient.name}</td>
                  <td className="px-4 py-2">{patient.age}</td>
                  <td className="px-4 py-2">{patient.gender}</td>
                  <td className="px-4 py-2">{patient.phone}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[patient.status]}`}>{patient.status}</span>
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