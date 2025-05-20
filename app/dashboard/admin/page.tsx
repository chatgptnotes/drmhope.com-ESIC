"use client";
import {
  UserIcon,
  CheckCircleIcon,
  UsersIcon,
  BanknotesIcon,
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  ClipboardIcon,
  PuzzlePieceIcon,
  BeakerIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';

import Link from "next/link";

const stats = [
  {
    label: "Total Patients",
    value: 245,
    icon: UserIcon,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "Today's Appointments",
    value: 32,
    icon: CheckCircleIcon,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    label: "Active Doctors",
    value: 28,
    icon: UsersIcon,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    label: "Today's Revenue",
    value: "₹3.2L",
    icon: BanknotesIcon,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

const quickActions = [
  {
    label: "IPD Dashboard",
    icon: Squares2X2Icon,
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/dashboard/admin/ipd",
  },
  {
    label: "OPD Dashboard",
    icon: Squares2X2Icon,
    color: "text-green-600",
    bg: "bg-green-50",
    href: "/dashboard/admin/opd",
  },
  {
    label: "Patient Management",
    icon: UsersIcon,
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "/dashboard/admin/patient-management",
  },
  {
    label: "Diagnosis Master",
    icon: ClipboardIcon,
    color: "text-red-600",
    bg: "bg-red-50",
    href: "/dashboard/admin/diagnosis-master",
  },
];

const masterLists = [
  {
    title: "Surgery Masters",
    links: [
      { label: "CGHS Surgery Master", icon: PuzzlePieceIcon, href: "/dashboard/admin/cghs-surgery-master" },
      { label: "Yojna Surgery Master", icon: PuzzlePieceIcon, href: "/dashboard/admin/yojna-surgery-master" },
      { label: "Private Surgery Master", icon: PuzzlePieceIcon, href: "/dashboard/admin/private-surgery-master" },
    ],
  },
  {
    title: "Investigation Masters",
    links: [
      { label: "Radiology Master", icon: BeakerIcon, href: "/dashboard/admin/radiology-master" },
      { label: "Lab Master", icon: RectangleStackIcon, href: "/dashboard/admin/lab-master" },
      { label: "Other Investigations", icon: ClipboardDocumentListIcon, href: "/dashboard/admin/other-investigations" },
    ],
  },
  {
    title: "Staff Masters",
    links: [
      { label: "Doctor Master", icon: UsersIcon, href: "#" },
      { label: "Medical Staff", icon: UsersIcon, href: "#" },
      { label: "User List", icon: UsersIcon, href: "#" },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Hospital Dashboard</h1>
        <p className="text-gray-500 mb-6">Welcome to your hospital management system</p>
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className={`rounded-lg shadow bg-white flex flex-col items-center p-5 ${stat.bg}`}>
                <Icon className={`w-8 h-8 mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            );
          })}
                  </div>
        {/* Quick Actions */}
        <div className="mb-2">
          <h2 className="font-bold text-lg mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link href={action.href} key={action.label} className={`rounded-lg flex flex-col items-center justify-center p-4 font-medium shadow-sm hover:shadow transition ${action.bg} hover:bg-opacity-80`}>
                  <Icon className={`w-8 h-8 mb-2 ${action.color}`} />
                  <span className={action.color}>{action.label}</span>
                </Link>
              );
            })}
                  </div>
                </div>
              </div>
      {/* Master Lists */}
      <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
        <h2 className="font-bold text-lg mb-4">Master Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {masterLists.map((list) => (
            <div key={list.title} className="rounded-lg border p-4">
              <div className="font-semibold text-gray-700 mb-2">{list.title}</div>
              <ul className="space-y-2">
                {list.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <Link href={link.href} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Icon className="w-4 h-4" />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 