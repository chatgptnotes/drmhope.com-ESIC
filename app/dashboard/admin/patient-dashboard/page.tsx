"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

type Row = {
  id: string;
  name: string;
  age: number;
  gender: string;
  primaryDiagnosis: string;
  surgery: string;
  status: string;
  registration: string;
  insurance: string;
  referee: string;
};

function StatusBadge({ status }: { status: string }) {
  let color = "bg-gray-200 text-gray-700";
  if (status === "Approved") color = "bg-green-100 text-green-700";
  else if (status === "Pending") color = "bg-yellow-100 text-yellow-800";
  else if (status === "Rejected") color = "bg-red-100 text-red-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{status}</span>
  );
}

function InsuranceBadge({ insurance }: { insurance: string }) {
  let color = "bg-gray-200 text-gray-700";
  if (insurance === "Active") color = "bg-green-100 text-green-700";
  else if (insurance === "Expired") color = "bg-red-100 text-red-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>{insurance}</span>
  );
}

export default function PatientDashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/patient-dashboard?page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => {
        setRows(data.rows);
        setTotal(data.total);
        setLoading(false);
      });
  }, [page, search]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h1 className="text-xl font-semibold">Patient Dashboard</h1>
        <div className="flex flex-1 items-center gap-2 sm:justify-end">
          <div className="relative w-full max-w-xs">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full shadow-sm"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow ml-2 whitespace-nowrap">
            <PlusIcon className="w-5 h-5" />
            New Patient Registration
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">NAME</th>
              <th className="px-4 py-3 text-left font-semibold">AGE/GENDER</th>
              <th className="px-4 py-3 text-left font-semibold">PRIMARY DIAGNOSIS</th>
              <th className="px-4 py-3 text-left font-semibold">SURGERY</th>
              <th className="px-4 py-3 text-left font-semibold">STATUS</th>
              <th className="px-4 py-3 text-left font-semibold">REGISTRATION</th>
              <th className="px-4 py-3 text-left font-semibold">INSURANCE</th>
              <th className="px-4 py-3 text-left font-semibold">REFEREE</th>
              <th className="px-4 py-3 text-left font-semibold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="text-center py-6 text-gray-400">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-400">No records found.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/40 transition border-b last:border-b-0 rounded-xl">
                  <td className="px-4 py-3 text-blue-700 font-medium underline cursor-pointer">
                    <Link href={`#`}>{row.id}</Link>
                  </td>
                  <td className="px-4 py-3 text-blue-700 underline cursor-pointer">
                    <Link href={`#`}>{row.name}</Link>
                  </td>
                  <td className="px-4 py-3">{row.age} / {row.gender}</td>
                  <td className="px-4 py-3">{row.primaryDiagnosis}</td>
                  <td className="px-4 py-3">{row.surgery}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3">{row.registration}</td>
                  <td className="px-4 py-3"><InsuranceBadge insurance={row.insurance} /></td>
                  <td className="px-4 py-3">{row.referee}</td>
                  <td className="px-4 py-3 text-center">
                    <Link href="#" className="inline-flex items-center justify-center text-blue-600 hover:text-blue-800">
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-2 text-xs text-gray-500">
          <div className="mb-2 sm:mb-0">
            {rows.length > 0 && (
              <span>
                Showing {((page-1)*PAGE_SIZE)+1} to {((page-1)*PAGE_SIZE)+rows.length} of {total} results
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;
            </button>
            <span className="text-sm">{page}</span>
            <button
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 