"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Package,
  ShoppingCart,
  Users,
  Star,
  MessageSquare,
  DollarSign,
  Clock,
} from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/admin/dashboard/StatCard";
import RecentOrdersTable from "@/components/admin/dashboard/RecentOrdersTable";

type DashboardStats = {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalReviews: number;
  totalContacts: number;
  totalRevenue: number;
  pendingOrders: number;
};

type RecentOrder = {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  profiles: { name: string; email: string } | null;
};

const statCardConfig = [
  {
    label: "Total Products",
    key: "totalProducts" as const,
    icon: <Package size={24} />,
    color: "bg-blue-50 text-blue-600",
    href: "/admin/products",
  },
  {
    label: "Total Orders",
    key: "totalOrders" as const,
    icon: <ShoppingCart size={24} />,
    color: "bg-green-50 text-green-600",
    href: "/admin/orders",
  },
  {
    label: "Total Users",
    key: "totalUsers" as const,
    icon: <Users size={24} />,
    color: "bg-purple-50 text-purple-600",
    href: "/admin/users",
  },
  {
    label: "Pending Orders",
    key: "pendingOrders" as const,
    icon: <Clock size={24} />,
    color: "bg-orange-50 text-orange-600",
    href: "/admin/orders",
  },
  {
    label: "Total Revenue",
    key: "totalRevenue" as const,
    icon: <DollarSign size={24} />,
    color: "bg-emerald-50 text-emerald-600",
    href: "/admin/orders",
    format: (v: number) => `$${v.toLocaleString()}`,
  },
  {
    label: "Reviews",
    key: "totalReviews" as const,
    icon: <Star size={24} />,
    color: "bg-yellow-50 text-yellow-600",
    href: "/admin/reviews",
  },
  {
    label: "Contact Messages",
    key: "totalContacts" as const,
    icon: <MessageSquare size={24} />,
    color: "bg-pink-50 text-pink-600",
    href: "/admin/contacts",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalReviews: 0,
    totalContacts: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      const [
        { count: productsCount },
        { count: ordersCount },
        { count: usersCount },
        { count: reviewsCount },
        { count: contactsCount },
        { data: ordersData },
        { count: pendingCount },
      ] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("reviews").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select("id, status, total_amount, created_at, profiles(name, email)")
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);

      const totalRevenue =
        ordersData?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        totalUsers: usersCount || 0,
        totalReviews: reviewsCount || 0,
        totalContacts: contactsCount || 0,
        totalRevenue,
        pendingOrders: pendingCount || 0,
      });

      setRecentOrders((ordersData as unknown as RecentOrder[])?.slice(0, 5) || []);
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        subtitle="Overview of your NEDF Design store"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCardConfig.map((card) => {
          const value = stats[card.key];
          return (
            <StatCard
              key={card.key}
              label={card.label}
              value={card.format ? card.format(value as number) : value}
              icon={card.icon}
              color={card.color}
              href={card.href}
            />
          );
        })}
      </div>

      {/* Recent Orders */}
      <RecentOrdersTable orders={recentOrders} loading={loading} />
    </div>
  );
}
