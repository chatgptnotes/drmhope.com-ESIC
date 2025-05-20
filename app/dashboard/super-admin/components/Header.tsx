"use client";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-40 bg-white shadow flex items-center justify-between h-16 px-4 sm:px-6 border-b">
      <span className="font-bold text-lg sm:text-xl">Super Admin Dashboard</span>
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
