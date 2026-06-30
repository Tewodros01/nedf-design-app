"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2, MailCheck, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SignUpPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [signedUpEmail, setSignedUpEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [resentMessage, setResentMessage] = useState(false);

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
      const { error: authError } = await supabase.auth.signUp({
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

      // Profile is created automatically by the database trigger on auth.users
      // Show verification message instead of immediately redirecting
      setSignedUpEmail(email);
      setVerificationSent(true);
      setLoading(false);
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResentMessage(false);

    try {
      const supabase = createClient();
      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: signedUpEmail,
      });

      if (resendError) {
        setError(resendError.message);
      } else {
        setResentMessage(true);
        setTimeout(() => setResentMessage(false), 3000);
      }
    } catch {
      setError("Failed to resend verification email.");
    }

    setResending(false);
  };

  // ── Verification Screen ──
  if (verificationSent) {
    return (
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <MailCheck className="w-10 h-10 text-green-600" />
          </div>

          <h1
            className={cn([
              integralCF.className,
              "text-3xl sm:text-4xl font-bold text-center mb-4",
            ])}
          >
            {t("verificationTitle")}
          </h1>

          <p className="text-black/60 text-sm sm:text-base mb-8 leading-relaxed">
            {t("verificationMessage").replace("{email}", signedUpEmail)}
          </p>

          <div className="bg-blue-50 rounded-[20px] p-5 mb-8 text-left">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Your profile is being created
                </p>
                <p className="text-xs text-blue-600">
                  Once you verify your email, your profile will be ready and you can sign in to start shopping.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resending}
            className="w-full bg-black text-white rounded-full py-3 h-12 font-medium text-sm hover:bg-black/80 transition-all disabled:opacity-50 mb-3 flex items-center justify-center gap-2"
          >
            {resending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t("verificationResend")
            )}
          </button>

          {resentMessage && (
            <p className="text-sm text-green-600 mb-3 flex items-center justify-center gap-1">
              <CheckCircle size={14} />
              {t("verificationResent")}
            </p>
          )}

          <Link
            href="/signin"
            className="inline-block text-sm text-black/60 hover:text-black underline"
          >
            {t("verificationSkip")}
          </Link>
        </div>
      </main>
    );
  }

  // ── Sign Up Form ──
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
