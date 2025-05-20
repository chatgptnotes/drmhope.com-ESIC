"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, UserIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

const statIcons = [UserIcon, CheckCircleIcon, ArrowPathIcon];

type Stat = {
  label: string;
  value: number | string;
  color: string;
  bg: string;
};

type Row = {
  patientId: string;
  name: string;
  age: number;
  gender: string;
  status: string;
};

function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-200 text-gray-700";
  if (status === "Admitted") color = "bg-green-100 text-green-700";
  else if (status === "Discharged") color = "bg-purple-100 text-purple-700";
  else if (status === "Under Observation") color = "bg-yellow-100 text-yellow-800";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>
  );
}

export default function PatientManagement() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState<Stat[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/patient-management?page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setRows(data.rows);
        setTotal(data.total);
        setLoading(false);
      });
  }, [page, search]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">Patient Management</h1>
          <div className="text-gray-500 text-base">Manage all patients in the hospital</div>
        </div>
        <div className="relative w-full max-w-xs ml-auto">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full shadow-sm"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = statIcons[i] || UserIcon;
          return (
            <div key={stat.label} className={`rounded-xl shadow-md bg-white flex flex-col items-center p-6 ${stat.bg} border border-gray-100`}>
              <Icon className={`w-8 h-8 mb-2 ${stat.color}`} />
              <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-700 text-base font-medium">{stat.label}</div>
            </div>
          );
        })}
      </div>
      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="px-4 py-3 text-left font-semibold">PATIENT ID</th>
              <th className="px-4 py-3 text-left font-semibold">NAME</th>
              <th className="px-4 py-3 text-left font-semibold">AGE</th>
              <th className="px-4 py-3 text-left font-semibold">GENDER</th>
              <th className="px-4 py-3 text-left font-semibold">STATUS</th>
              <th className="px-4 py-3 text-left font-semibold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-6 text-gray-400">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">No records found.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.patientId} className="hover:bg-blue-50/40 transition border-b last:border-b-0 rounded-xl">
                  <td className="px-4 py-3 text-blue-700 font-medium underline cursor-pointer">
                    <Link href={`#`}>{row.patientId}</Link>
                  </td>
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.age}</td>
                  <td className="px-4 py-3">{row.gender}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-blue-600 hover:bg-blue-100 rounded px-2 py-1 text-xs font-semibold transition">View</button>
                    <button className="text-green-600 hover:bg-green-100 rounded px-2 py-1 text-xs font-semibold transition">Edit</button>
                    <button className="text-red-600 hover:bg-red-100 rounded px-2 py-1 text-xs font-semibold transition">Discharge</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-2">
        <button
          className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium bg-white hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm font-semibold">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium bg-white hover:bg-gray-100 transition disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
} 