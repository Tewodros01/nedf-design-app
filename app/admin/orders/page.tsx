"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Search, Eye } from "lucide-react";

type Order = {
  id: number;
  user_id: string;
  status: string;
  total_amount: number;
  shipping_address: Record<string, unknown> | null;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  profiles: { name: string; email: string };
  order_items?: {
    id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    size: string | null;
    color: string | null;
  }[];
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusOptions = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const supabase = createClient();
      let query = supabase
        .from("orders")
        .select("*, profiles(name, email)")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(
          `id.eq.${searchQuery},profiles.name.ilike.%${searchQuery}%`
        );
      }

      const { data } = await query;
      if (data) setOrders(data as unknown as Order[]);
      setLoading(false);
    };

    fetchOrders();
  }, [searchQuery]);

  const updateStatus = async (orderId: number, newStatus: string) => {
    const supabase = createClient();
    await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Orders</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage customer orders and update statuses
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by order ID or customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
        />
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-lg">
                Order #{selectedOrder.id}
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Customer</p>
                  <p className="text-sm font-medium">
                    {selectedOrder.profiles?.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {selectedOrder.profiles?.email}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <p className="text-sm font-medium">
                    {new Date(selectedOrder.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-sm font-medium">
                    ${Number(selectedOrder.total_amount).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Payment</p>
                  <p className="text-sm font-medium">
                    {selectedOrder.payment_method || "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Status</p>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {selectedOrder.notes && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Notes</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {selectedOrder.shipping_address && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Shipping Address
                  </p>
                  <pre className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 overflow-x-auto">
                    {JSON.stringify(selectedOrder.shipping_address, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Order</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-black">#{order.id}</td>
                    <td className="px-4 py-3">{order.profiles?.name || "N/A"}</td>
                    <td className="px-4 py-3 font-medium">
                      ${Number(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                          statusColors[order.status] || "bg-gray-100"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-gray-50">
            {orders.map((order) => (
              <div
                key={order.id}
                className="px-4 py-4"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-black text-sm">Order #{order.id}</span>
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                      statusColors[order.status] || "bg-gray-100"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{order.profiles?.name || "N/A"}</span>
                  <span className="font-semibold">${Number(order.total_amount).toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
