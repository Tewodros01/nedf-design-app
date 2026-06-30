"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch } from "@/lib/hooks/redux";
import { restoreSession, signOut } from "@/lib/features/auth/authSlice";

export default function SupabaseSessionListener({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const supabase = createClient();

    // Check for existing session on mount
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("profiles")
          .select("name, email, role")
          .eq("id", user.id)
          .single()
          .then(({ data: profile }) => {
            dispatch(
              restoreSession({
                id: user.id,
                name: profile?.name || user.email?.split("@")[0] || "User",
                email: user.email || "",
                role: profile?.role || "customer",
              })
            );
          });
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        supabase
          .from("profiles")
          .select("name, email, role")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => {
            dispatch(
              restoreSession({
                id: session.user.id,
                name: profile?.name || session.user.email?.split("@")[0] || "User",
                email: session.user.email || "",
                role: profile?.role || "customer",
              })
            );
          });
      } else if (event === "SIGNED_OUT") {
        dispatch(signOut());
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
}
