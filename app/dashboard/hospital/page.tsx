'use client';

import { useSession } from "next-auth/react";

export default function HospitalDashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Welcome, {session?.user?.email}</h3>
            <p className="mt-1 text-sm text-gray-500">
              This is your hospital dashboard where you can manage your hospital's operations.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-blue-900">Hospital Overview</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-blue-600">Total Patients</p>
                    <p className="text-2xl font-semibold text-blue-900">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600">Available Beds</p>
                    <p className="text-2xl font-semibold text-blue-900">0</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium text-purple-900">Today's Activity</h4>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-sm text-purple-600">New Admissions</p>
                    <p className="text-2xl font-semibold text-purple-900">0</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-600">Discharges</p>
                    <p className="text-2xl font-semibold text-purple-900">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 