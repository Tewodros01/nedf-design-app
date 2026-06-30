"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Search, Shield, ShieldOff, Trash2 } from "lucide-react";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  created_at: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const supabase = createClient();
      let query = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
        );
      }

      const { data } = await query;
      if (data) setUsers(data as UserProfile[]);
      setLoading(false);
    };

    fetchUsers();
  }, [searchQuery]);

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "customer" : "admin";
    const supabase = createClient();
    await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: newRole as "customer" | "admin" } : u
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Users</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage registered users and admin permissions
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
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">User</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Joined</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-sm font-medium shrink-0">
                          {user.name?.charAt(0) || "?"}
                        </div>
                        <span className="font-medium text-black">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => toggleRole(user.id, user.role)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.role === "admin"
                            ? "text-orange-500 hover:bg-orange-50"
                            : "text-gray-400 hover:bg-gray-100 hover:text-black"
                        }`}
                        title={user.role === "admin" ? "Remove admin role" : "Make admin"}
                      >
                        {user.role === "admin" ? <ShieldOff size={16} /> : <Shield size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="sm:hidden divide-y divide-gray-50">
            {users.map((user) => (
              <div key={user.id} className="px-4 py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center text-sm font-medium shrink-0">
                    {user.name?.charAt(0) || "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-black text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <span
                      className={`inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleRole(user.id, user.role)}
                  className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                    user.role === "admin"
                      ? "text-orange-500 hover:bg-orange-50"
                      : "text-gray-400 hover:bg-gray-100 hover:text-black"
                  }`}
                  title={user.role === "admin" ? "Remove admin role" : "Make admin"}
                >
                  {user.role === "admin" ? <ShieldOff size={18} /> : <Shield size={18} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
