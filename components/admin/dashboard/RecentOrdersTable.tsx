"use client";

import Link from "next/link";

type RecentOrder = {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
  profiles: { name: string; email: string } | null;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

type RecentOrdersTableProps = {
  orders: RecentOrder[];
  loading?: boolean;
};

export default function RecentOrdersTable({
  orders,
  loading,
}: RecentOrdersTableProps) {
  return (
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

      {loading ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">
          Loading...
        </div>
      ) : orders.length === 0 ? (
        <div className="px-6 py-8 text-center text-sm text-gray-400">
          No orders yet
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
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-black">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 text-black">
                    {order.profiles?.name ||
                      order.profiles?.email ||
                      "N/A"}
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
  );
}
