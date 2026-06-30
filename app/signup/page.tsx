"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useAppDispatch } from "@/lib/hooks/redux";
import { signUp } from "@/lib/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError(t("fillAllFields"));
      return;
    }

    if (password.length < 6) {
      setError(t("passwordMinLength"));
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // The profile is created automatically by the database trigger
        // But we wait a moment for the trigger to complete
        setTimeout(async () => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("name, email, role")
            .eq("id", data.user!.id)
            .single();

          dispatch(
            signUp({
              id: data.user!.id,
              name: profile?.name || name,
              email: data.user!.email || email,
              role: profile?.role || "customer",
            })
          );

          setLoading(false);
          router.push("/");
        }, 1000);
        return;
      }

      setLoading(false);
    } catch {
      setError("An unexpected error occurred. Please try again.");
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
          {t("signUpTitle")}
        </h1>
        <p className="text-black/60 text-center text-sm sm:text-base mb-8">
          {t("signUpDesc")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black/70 mb-1.5">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-black/10 rounded-full focus:outline-none focus:border-black/30 bg-transparent text-sm placeholder:text-black/30"
            />
          </div>

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
                placeholder="At least 6 characters"
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
              t("signup")
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-black/60 mt-6">
          {t("hasAccount")}{" "}
          <Link href="/signin" className="text-black font-medium underline hover:no-underline">
            {t("signin")}
          </Link>
        </p>
      </div>
    </main>
  );
}
