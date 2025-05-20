'use client';

import { useState } from 'react';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon, MapPinIcon, BellIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  // Mock clinic info
  const [clinic, setClinic] = useState({
    name: 'Sunrise Clinic',
    address: '123 Main Street, City, State',
    phone: '9876543210',
    email: 'info@sunriseclinic.com',
  });
  const [notifications, setNotifications] = useState({
    appointment: true,
    report: false,
    marketing: false,
  });
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      {/* Clinic Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BuildingOffice2Icon className="w-6 h-6 text-blue-500" /> Clinic Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
            <input type="text" className="w-full border rounded px-3 py-2" value={clinic.name} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="flex items-center gap-2"><PhoneIcon className="w-5 h-5 text-gray-400" /><input type="text" className="w-full border rounded px-3 py-2" value={clinic.phone} readOnly /></div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <div className="flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-gray-400" /><input type="text" className="w-full border rounded px-3 py-2" value={clinic.address} readOnly /></div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center gap-2"><EnvelopeIcon className="w-5 h-5 text-gray-400" /><input type="email" className="w-full border rounded px-3 py-2" value={clinic.email} readOnly /></div>
          </div>
        </div>
      </div>
      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><LockClosedIcon className="w-6 h-6 text-yellow-500" /> Change Password</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={password.current} onChange={e => setPassword(p => ({ ...p, current: e.target.value }))} />
          </div>
          <div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={password.new} onChange={e => setPassword(p => ({ ...p, new: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={password.confirm} onChange={e => setPassword(p => ({ ...p, confirm: e.target.value }))} />
          </div>
        </div>
        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow">Update Password</button>
      </div>
      {/* Notification Preferences */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><BellIcon className="w-6 h-6 text-green-500" /> Notification Preferences</h3>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.appointment} onChange={e => setNotifications(n => ({ ...n, appointment: e.target.checked }))} />
            Appointment Reminders
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.report} onChange={e => setNotifications(n => ({ ...n, report: e.target.checked }))} />
            Report Ready Alerts
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifications.marketing} onChange={e => setNotifications(n => ({ ...n, marketing: e.target.checked }))} />
            Marketing & Updates
          </label>
        </div>
        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow">Save Preferences</button>
      </div>
    </div>
  );
} 