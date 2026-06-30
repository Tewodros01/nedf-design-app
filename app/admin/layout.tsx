"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();

      // Get the authenticated user from Supabase Auth
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        router.push("/signin");
        setChecking(false);
        return;
      }

      // Fetch the user's profile including role
      // Retry once in case of a transient RLS/session timing issue
      let profile = null;
      for (let attempt = 0; attempt < 2; attempt++) {
        const { data, error } = await supabase
          .from("profiles")
          .select("name, email, role")
          .eq("id", authUser.id)
          .single();

        if (!error && data) {
          profile = data;
          break;
        }

        // Wait briefly before retry on first failure
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 500));
        }
      }

      if (!profile) {
        // Profile not found — likely not set up yet; redirect home
        router.push("/");
        setChecking(false);
        return;
      }

      if (profile.role !== "admin") {
        router.push("/");
        setChecking(false);
        return;
      }

      setUser({ name: profile.name, email: profile.email });
      setIsAdmin(true);
      setChecking(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/signin");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-black/60">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen lg:h-screen bg-gray-50 flex lg:overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSignOut={handleSignOut}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:overflow-y-auto">
        {/* Top Bar (Mobile) */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg">Admin</span>
          <div className="w-8" /> {/* Spacer */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
