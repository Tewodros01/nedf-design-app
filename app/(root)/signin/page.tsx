"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch } from "@/lib/hooks/redux";
import { signIn } from "@/lib/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("fillAllFields"));
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, email, role")
          .eq("id", data.user.id)
          .single();

        dispatch(
          signIn({
            id: data.user.id,
            name: profile?.name || email.split("@")[0],
            email: data.user.email || email,
            role: profile?.role || "customer",
          })
        );

        // Redirect to admin if admin role
        if (profile?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <h1
          className={cn([
            integralCF.className,
            "text-3xl sm:text-4xl font-bold text-center mb-2",
          ])}
        >
          {t("signInTitle")}
        </h1>
        <p className="text-black/60 text-center text-sm sm:text-base mb-8">
          {t("signInDesc")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black/70 mb-1.5">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-black/10 rounded-full focus:outline-none focus:border-black/30 bg-transparent text-sm placeholder:text-black/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black/70 mb-1.5">
              {t("password")}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-12 border border-black/10 rounded-full focus:outline-none focus:border-black/30 bg-transparent text-sm placeholder:text-black/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60"
                aria-label={showPassword ? t("hidePassword") : t("showPassword")}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-full py-3 h-12 font-medium text-sm hover:bg-black/80 transition-all"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t("signin")
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-black/60 mt-6">
          {t("noAccount")}{" "}
          <Link href="/signup" className="text-black font-medium underline hover:no-underline">
            {t("signup")}
          </Link>
        </p>
      </div>
    </main>
  );
}
