"use client";
import { useState, useEffect } from "react";
import { PlusIcon, ArrowUpTrayIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const PAGE_SIZE = 10;

const categoryColors: Record<string, string> = {
  Ophthalmology: 'bg-blue-100 text-blue-700',
  Cardiology: 'bg-pink-100 text-pink-700',
  'General Surgery': 'bg-yellow-100 text-yellow-700',
  Orthopedics: 'bg-green-100 text-green-700',
  ENT: 'bg-purple-100 text-purple-700',
};

const schemeColors: Record<string, string> = {
  PMJAY: 'bg-green-100 text-green-700',
  MJPJAY: 'bg-orange-100 text-orange-700',
};

type Row = {
  surgeryName: string;
  category: string;
  scheme: string;
  nabhRate: number;
  nonNabhRate: number;
  packageCode: string;
};

function formatCurrency(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function YojnaSurgeryMaster() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/yojna-surgery-master?page=${page}&pageSize=${PAGE_SIZE}&search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`)
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
          <div>
            <h1 className="text-2xl font-bold leading-tight">Yojna Surgery Master</h1>
            <div className="text-gray-500 text-sm">Yojna Surgery Master</div>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow whitespace-nowrap">
              <ArrowUpTrayIcon className="w-5 h-5" />
              Upload Excel/CSV
            </button>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow whitespace-nowrap">
              <PlusIcon className="w-5 h-5" />
              Add More
            </button>
          </div>
        </div>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
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
                <option key={cat} value={cat}>{cat === 'All' ? 'All' : cat}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="px-4 py-2 text-left font-semibold">SURGERY NAME</th>
                <th className="px-4 py-2 text-left font-semibold">CATEGORY</th>
                <th className="px-4 py-2 text-left font-semibold">SCHEME</th>
                <th className="px-4 py-2 text-left font-semibold">NABH RATE</th>
                <th className="px-4 py-2 text-left font-semibold">NON-NABH RATE</th>
                <th className="px-4 py-2 text-left font-semibold">PACKAGE CODE</th>
                <th className="px-4 py-2 text-left font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-6 text-gray-400">Loading...</td></tr>
              ) : rows.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-6 text-gray-400">No records found.</td></tr>
              ) : (
                rows.map(row => (
                  <tr key={row.packageCode} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold text-blue-900">{row.surgeryName}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[row.category] || 'bg-gray-100 text-gray-700'}`}>{row.category}</span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${schemeColors[row.scheme] || 'bg-gray-100 text-gray-700'}`}>{row.scheme}</span>
                    </td>
                    <td className="px-4 py-2 font-semibold">{formatCurrency(row.nabhRate)}</td>
                    <td className="px-4 py-2 font-semibold">{formatCurrency(row.nonNabhRate)}</td>
                    <td className="px-4 py-2">{row.packageCode}</td>
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
      </div>
    </div>
  );
} 