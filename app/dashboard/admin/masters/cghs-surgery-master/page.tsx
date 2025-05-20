"use client";
import { useState, useEffect } from "react";
import { PuzzlePieceIcon, PlusIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

const categoryColors: Record<string, string> = {
  Cardiac: 'bg-pink-100 text-pink-700',
  Orthopedic: 'bg-blue-100 text-blue-700',
  Neurosurgery: 'bg-purple-100 text-purple-700',
  Gastroenterology: 'bg-yellow-100 text-yellow-700',
  Urology: 'bg-green-100 text-green-700',
};

type Row = {
  code: string;
  name: string;
  category: string;
  nabh: number;
  nonNabh: number;
};

function formatCurrency(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function CGHSSurgeryMaster() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cghs-surgery-master?page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        setRows(data.rows);
        setTotal(data.total);
        setCategories(["All", ...data.categories]);
        setLoading(false);
      });
  }, [page, search, category]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center gap-3">
            <PuzzlePieceIcon className="w-7 h-7 text-gray-500" />
            <div>
              <h1 className="text-2xl font-bold leading-tight">CGHS Surgery Master</h1>
              <div className="text-gray-500 text-sm">Manage CGHS approved surgeries and their rates</div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search surgeries..."
                className="pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white w-full shadow-sm"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"/></svg>
              </span>
            </div>
            <select
              className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={e => { setCategory(e.target.value); setPage(1); }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow whitespace-nowrap">
            <PlusIcon className="w-5 h-5" />
            Add Surgery
          </button>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="px-4 py-2 text-left font-semibold">CODE</th>
                <th className="px-4 py-2 text-left font-semibold">SURGERY NAME</th>
                <th className="px-4 py-2 text-left font-semibold">CATEGORY</th>
                <th className="px-4 py-2 text-left font-semibold">NABH RATE (₹)</th>
                <th className="px-4 py-2 text-left font-semibold">NON-NABH RATE (₹)</th>
                <th className="px-4 py-2 text-left font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-6 text-gray-400">Loading...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-6 text-gray-400">No records found.</td></tr>
              ) : (
                rows.map(row => (
                  <tr key={row.code} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-blue-900">{row.code}</td>
                    <td className="px-4 py-2">{row.name}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[row.category] || 'bg-gray-100 text-gray-700'}`}>{row.category}</span>
                    </td>
                    <td className="px-4 py-2 font-semibold">{formatCurrency(row.nabh)}</td>
                    <td className="px-4 py-2 font-semibold">{formatCurrency(row.nonNabh)}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline mr-3">Edit</button>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 py-3 text-xs text-gray-500">
          <div className="mb-2 sm:mb-0">
            {rows.length > 0 && (
              <span>
                Showing {((page-1)*PAGE_SIZE)+1} to {((page-1)*PAGE_SIZE)+rows.length} of {total} surgeries
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 rounded border text-sm disabled:opacity-50 bg-blue-600 text-white"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
        {/* Info Card */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="font-semibold mb-1">About NABH Rates</div>
          <div className="text-sm text-gray-700">
            CGHS rates are categorized based on hospital accreditation status:<br />
            <ul className="list-disc ml-6 mt-1">
              <li><b>NABH Rate:</b> The rate applicable for hospitals with NABH (National Accreditation Board for Hospitals & Healthcare Providers) accreditation.</li>
              <li><b>Non-NABH Rate:</b> The rate applicable for hospitals without NABH accreditation.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 