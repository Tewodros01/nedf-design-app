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
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

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
  profiles: { name: string; email: string };
};

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
        { data: pendingData },
      ] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("reviews").select("*", { count: "exact", head: true }),
        supabase.from("contacts").select("*", { count: "exact", head: true }),
        supabase
          .from("orders")
          .select(
            "id, status, total_amount, created_at, profiles(name, email)"
          )
          .order("created_at", { ascending: false })
          .limit(5),
        supabase
          .from("orders")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
      ]);

      const totalRevenue =
        ordersData?.reduce(
          (sum, o) => sum + Number(o.total_amount),
          0
        ) || 0;

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        totalUsers: usersCount || 0,
        totalReviews: reviewsCount || 0,
        totalContacts: contactsCount || 0,
        totalRevenue,
        pendingOrders: pendingData?.length || 0,
      });

      setRecentOrders(
        (ordersData as unknown as RecentOrder[])?.slice(0, 5) || []
      );
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: <Package size={24} />,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/products",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingCart size={24} />,
      color: "bg-green-50 text-green-600",
      href: "/admin/orders",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/users",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: <Clock size={24} />,
      color: "bg-orange-50 text-orange-600",
      href: "/admin/orders",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={24} />,
      color: "bg-emerald-50 text-emerald-600",
      href: "/admin/orders",
    },
    {
      label: "Reviews",
      value: stats.totalReviews,
      icon: <Star size={24} />,
      color: "bg-yellow-50 text-yellow-600",
      href: "/admin/reviews",
    },
    {
      label: "Contact Messages",
      value: stats.totalContacts,
      icon: <MessageSquare size={24} />,
      color: "bg-pink-50 text-pink-600",
      href: "/admin/contacts",
    },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    processing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your NEDF Design store
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${card.color}`}>{card.icon}</div>
              <TrendingUp size={18} className="text-green-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black">
              {card.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-black">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-black/60 hover:text-black transition-colors"
          >
            View all →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-gray-400">
            {loading ? "Loading..." : "No orders yet"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="text-left px-6 py-3 font-medium text-gray-500">
                    Order
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">
                    Customer
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-gray-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-black">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-black">
                      {order.profiles?.name || order.profiles?.email || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      ${Number(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                          statusColors[order.status] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
