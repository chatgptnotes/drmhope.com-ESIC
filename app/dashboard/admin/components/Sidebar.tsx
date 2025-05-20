"use client";
import Link from "next/link";
import { sidebarRoutes } from "./sidebar-routes";
import { ElementType } from "react";

type SidebarItem = {
  label: string;
  icon: ElementType;
  path: string;
};

type SidebarSection = {
  section: string;
  items: SidebarItem[];
};

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen?: boolean; onClose?: () => void }) {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity md:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />
      <aside
        className={`
          fixed z-50 top-0 left-0 h-full bg-white border-r border-gray-200 shadow-sm transition-transform duration-300
          w-64 md:sticky md:top-16 md:z-30 md:block
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        style={{ maxWidth: 260 }}
      >
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          {(sidebarRoutes as SidebarSection[]).map((section) => (
            <div key={section.section} className="mb-7">
              <div className="text-[11px] font-semibold text-gray-400 tracking-widest px-2 mb-2 uppercase">
                {section.section}
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <Link href={item.path} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 text-gray-700 font-medium transition-colors">
                        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
 