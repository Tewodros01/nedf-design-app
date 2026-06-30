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
  Menu,
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
      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200",
          "transform transition-transform duration-200 ease-in-out",
          "lg:transform-none lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <Link href="/admin" className="flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              <span className="font-bold text-lg">Admin</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
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
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-black"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Sign Out */}
          <div className="border-t border-gray-100 px-4 py-4">
            {user && (
              <div className="mb-3 px-2">
                <p className="text-sm font-medium text-black truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            )}
            <button
              onClick={onSignOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
