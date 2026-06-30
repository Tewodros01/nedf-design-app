"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Menu, LayoutDashboard } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();

      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !authUser) {
        router.push("/signin");
        setChecking(false);
        return;
      }

      // Fetch profile with retry
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

        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 500));
        }
      }

      if (!profile) {
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

  // Close sidebar when pressing Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:overflow-y-auto">
        {/* Mobile top bar — sticky, with menu toggle */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-0 flex items-center justify-between sticky top-0 z-30 min-h-[56px]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <LayoutDashboard size={18} className="text-black/60" />
            <span className="font-bold text-base">Admin Panel</span>
          </div>
          {/* Spacer to balance the menu button */}
          <div className="w-10" />
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
