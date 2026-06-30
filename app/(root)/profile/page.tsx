"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { signOut } from "@/lib/features/auth/authSlice";
import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import {
  User,
  Mail,
  Shield,
  Package,
  LogOut,
  Loader2,
  Save,
  CheckCircle,
  Clock,
  ShoppingBag,
  ChevronRight,
  Phone,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Order = {
  id: number;
  status: string;
  total_amount: number;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.push("/signin");
        return;
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, phone, avatar_url")
        .eq("id", authUser.id)
        .single();

      if (profileData) {
        setProfile({
          name: profileData.name || "",
          phone: profileData.phone || "",
          avatar_url: profileData.avatar_url || "",
        });
      }

      // Fetch recent orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("id, status, total_amount, created_at")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (ordersData) {
        setOrders(ordersData as Order[]);
      }

      setLoading(false);
    };

    fetchData();
  }, [isAuthenticated, router]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      await supabase
        .from("profiles")
        .update({
          name: profile.name,
          phone: profile.phone || null,
          avatar_url: profile.avatar_url || null,
        })
        .eq("id", authUser.id);
    }

    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    dispatch(signOut());
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-black/40" />
      </main>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-frame mx-auto px-4 xl:px-8 pt-5 sm:pt-6">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <nav className="flex items-center text-sm text-black/60 mb-8">
          <Link href="/" className="hover:text-black">
            {t("home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{t("profile")}</span>
        </nav>
      </div>

      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Header */}
            <div className="bg-[#F0F0F0] rounded-[20px] p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
                    {profile.name
                      ? profile.name.charAt(0).toUpperCase()
                      : user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  {profile.avatar_url && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Camera size={12} className="text-black/60" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1
                    className={cn([
                      integralCF.className,
                      "text-2xl sm:text-3xl font-bold text-black mb-1",
                    ])}
                  >
                    {profile.name || user?.name || "User"}
                  </h1>
                  <p className="text-sm text-black/60 flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                    <Mail size={14} />
                    {user?.email || ""}
                  </p>
                  {profile.phone && (
                    <p className="text-sm text-black/60 flex items-center justify-center sm:justify-start gap-1.5">
                      <Phone size={14} />
                      {profile.phone}
                    </p>
                  )}
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-black text-white rounded-full text-xs font-medium hover:bg-black/80 transition-colors"
                    >
                      <Shield size={14} />
                      Admin Dashboard
                    </Link>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 sm:items-end">
                  <Button
                    onClick={() => setEditing(!editing)}
                    variant="ghost"
                    className="text-sm text-black/60 hover:text-black px-4 py-2 rounded-full border border-black/10"
                  >
                    {editing ? "Cancel" : "Edit Profile"}
                  </Button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-full border border-red-200 transition-colors"
                  >
                    <LogOut size={14} />
                    {t("signout")}
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            {editing && (
              <div className="bg-white rounded-[20px] border border-black/10 p-6 sm:p-8">
                <h2 className="font-bold text-lg sm:text-xl text-black mb-6">
                  Edit Profile
                </h2>
                <form onSubmit={saveProfile} className="space-y-5 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1.5">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-black/10 rounded-full focus:outline-none focus:border-black/30 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      placeholder="+251..."
                      className="w-full px-4 py-3 border border-black/10 rounded-full focus:outline-none focus:border-black/30 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1.5">
                      Avatar URL
                    </label>
                    <input
                      type="text"
                      value={profile.avatar_url}
                      onChange={(e) =>
                        setProfile({ ...profile, avatar_url: e.target.value })
                      }
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-4 py-3 border border-black/10 rounded-full focus:outline-none focus:border-black/30 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Save Changes
                    </button>
                    {saved && (
                      <span className="flex items-center gap-1.5 text-sm text-green-600">
                        <CheckCircle size={16} />
                        Saved
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-6 py-3 text-sm text-black/60 hover:text-black"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Order History */}
            <div>
              <h2 className="font-bold text-xl sm:text-2xl text-black mb-6 flex items-center gap-2">
                <Package size={22} />
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="bg-[#F0F0F0] rounded-[20px] p-8 sm:p-12 text-center">
                  <ShoppingBag
                    size={48}
                    className="mx-auto text-black/20 mb-4"
                  />
                  <p className="text-black/60 text-sm sm:text-base mb-4">
                    No orders yet
                  </p>
                  <Link
                    href="/shop"
                    className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
                  >
                    {t("shop")}
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-[20px] border border-black/10 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center flex-shrink-0">
                          <Package size={18} className="text-black/40" />
                        </div>
                        <div>
                          <p className="font-medium text-sm sm:text-base text-black">
                            Order #{order.id}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-black/40" />
                            <span className="text-xs text-black/40">
                              {new Date(order.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            statusColors[order.status] || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="font-bold text-sm sm:text-base">
                          ${Number(order.total_amount).toLocaleString()}
                        </span>
                        <ChevronRight
                          size={16}
                          className="text-black/20 hidden sm:block"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

