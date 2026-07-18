"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import EmberField from "@/components/EmberField";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-ink text-bone flex items-center justify-center relative overflow-hidden px-5">
      <EmberField count={18} />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "300px",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,77,28,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Image
              src="/PhoenixLogo.jpg"
              alt="Phoenix Ecosystem"
              width={52}
              height={52}
              className="rounded-full border border-card-line mb-3"
            />
          </Link>
          <span className="font-display text-[1.05rem] tracking-tight flame-text">
            PHOENIX
          </span>
          <span className="font-mono text-[0.7rem] text-ash-dim uppercase tracking-[0.14em] mt-1">
            Reset Password
          </span>
        </div>

        <div className="bg-card border border-card-line rounded-[20px] p-8">
          {status === "success" ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="font-display text-[1.4rem]">Check your email</h2>
              <p className="mt-3 text-ash text-[0.92rem] leading-relaxed">
                We sent a password reset link to{" "}
                <span className="text-ember">{email}</span>. Click the link in
                the email to set a new password.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 mt-6 text-[0.84rem] text-ash hover:text-ember transition-colors"
              >
                <ArrowLeft size={14} />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-bold text-[1.05rem] mb-2">Forgot your password?</h1>
              <p className="text-ash text-[0.88rem] mb-6">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[0.82rem] font-semibold text-bone">
                    Email
                  </span>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-dim"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      autoFocus
                      className="w-full bg-ink/60 border border-card-line rounded-[10px] pl-10 pr-4 py-3 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors"
                    />
                  </div>
                </label>

                {status === "error" && (
                  <p className="text-flame text-[0.84rem] text-center">
                    Something went wrong. Please try again.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full grad-flame text-[#110603] font-bold text-[0.95rem] py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Reset Link"}
                </motion.button>
              </form>

              <p className="text-center text-ash text-[0.84rem] mt-5">
                Remember it?{" "}
                <Link
                  href="/login"
                  className="text-ember hover:text-bone transition-colors font-semibold"
                >
                  Back to login
                </Link>
              </p>
            </>
          )}
        </div>
      </motion.div>
    </div>
    <Footer />
    </>
  );
}