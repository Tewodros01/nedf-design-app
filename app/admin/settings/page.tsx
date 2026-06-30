"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Save, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Profile settings
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    avatar_url: "",
  });

  // Contact info - stored in a settings table ideally, but for now let's show profile
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("name, phone, avatar_url")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            name: data.name || "",
            phone: data.phone || "",
            avatar_url: data.avatar_url || "",
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("profiles")
        .update({
          name: profile.name,
          phone: profile.phone,
          avatar_url: profile.avatar_url || null,
        })
        .eq("id", user.id);
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your admin profile and account settings
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-black text-lg mb-6">
          Profile Settings
        </h2>
        <form onSubmit={saveProfile} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black/70 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black/70 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
              placeholder="+251..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
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
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black/30"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors disabled:opacity-50 flex items-center gap-2"
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
                Saved successfully
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-black text-lg mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 font-bold text-xs">
              SB
            </div>
            <div>
              <p className="text-sm font-medium text-black">Supabase Dashboard</p>
              <p className="text-xs text-gray-400">Manage your database</p>
            </div>
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center text-xs font-bold">
              N
            </div>
            <div>
              <p className="text-sm font-medium text-black">View Store</p>
              <p className="text-xs text-gray-400">Open the front-end store</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
