"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import EmberField from "@/components/EmberField";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setStatus("loading");
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setStatus("error");
      return;
    }

    setStatus("success");
    setTimeout(() => router.push("/agency"), 2000);
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
            Set New Password
          </span>
        </div>

        <div className="bg-card border border-card-line rounded-[20px] p-8">
          {status === "success" ? (
            <div className="text-center">
              <div className="text-4xl mb-4">🔥</div>
              <h2 className="font-display text-[1.4rem]">Password updated!</h2>
              <p className="mt-3 text-ash text-[0.92rem]">
                Redirecting you back to the ecosystem...
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-bold text-[1.05rem] mb-6">
                Set a new password
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-[0.82rem] font-semibold text-bone">
                    New Password
                  </span>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-dim"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      required
                      autoFocus
                      className="w-full bg-ink/60 border border-card-line rounded-[10px] pl-10 pr-11 py-3 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ash-dim hover:text-ash transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-[0.82rem] font-semibold text-bone">
                    Confirm Password
                  </span>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-dim"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Repeat new password"
                      required
                      className="w-full bg-ink/60 border border-card-line rounded-[10px] pl-10 pr-4 py-3 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors"
                    />
                  </div>
                </label>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-flame text-[0.84rem] text-center"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full grad-flame text-[#110603] font-bold text-[0.95rem] py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-50"
                >
                  {status === "loading" ? "Updating..." : "Update Password"}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
    <Footer />
    </>
  );
}