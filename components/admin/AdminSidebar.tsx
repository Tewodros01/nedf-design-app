"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Star,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  X,
  Image as ImageIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
};

const defaultNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: <Package size={20} />,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart size={20} />,
  },
  {
    label: "Reviews",
    href: "/admin/reviews",
    icon: <Star size={20} />,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <Users size={20} />,
  },
  {
    label: "Contacts",
    href: "/admin/contacts",
    icon: <MessageSquare size={20} />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings size={20} />,
  },
];

type AdminSidebarProps = {
  sidebarOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
  user: { name: string; email: string } | null;
  navItems?: NavItem[];
};

export default function AdminSidebar({
  sidebarOpen,
  onClose,
  onSignOut,
  user,
  navItems = defaultNavItems,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50",
          "w-[260px] sm:w-64 bg-white border-r border-gray-200",
          "transform transition-transform duration-250 ease-in-out",
          "flex flex-col",
          /* On mobile: slide in/out */
          "lg:transform-none lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 min-h-[56px]">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-2.5"
          >
            <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-base">Admin</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-9 h-9 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Info + Sign Out */}
        <div className="border-t border-gray-100 px-4 py-4 space-y-1">
          {user && (
            <div className="px-2 py-2 mb-1">
              <p className="text-sm font-medium text-black truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={onSignOut}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
