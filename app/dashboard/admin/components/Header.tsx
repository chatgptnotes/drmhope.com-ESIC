"use client";
import { useSession, signOut } from "next-auth/react";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-40 bg-white shadow flex items-center justify-between h-16 px-4 sm:px-6 border-b">
      <div className="flex items-center gap-2">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-bold text-lg sm:text-xl">Dashboard</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-gray-700 text-xs sm:text-base">{session?.user?.email} ({session?.user?.role})</span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
} 