"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import EmberField from "@/components/EmberField";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setStatus("error");
      setPassword("");
    }
  }

  return (
    <div className="min-h-screen bg-ink text-bone flex items-center justify-center relative overflow-hidden">
      <EmberField count={20} />

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
        className="relative z-10 w-full max-w-[400px] mx-auto px-6"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/PhoenixLogo.jpg"
            alt="Phoenix Ecosystem"
            width={150}
            height={150}
            className="rounded-full border border-card-line mb-4"
          />
          <span className="font-display text-[1.1rem] tracking-tight flame-text">
            PHOENIX
          </span>
          <span className="font-mono text-[0.72rem] text-ash-dim uppercase tracking-[0.14em] mt-1">
            Admin Portal
          </span>
        </div>

        {/* Card */}
        <div className="bg-card border border-card-line rounded-[20px] p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <Lock size={18} className="text-ember" />
            <h1 className="font-bold text-[1.05rem]">Sign in to Admin</h1>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.82rem] font-semibold text-bone">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setStatus("idle");
                  }}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="w-full bg-ink/60 border border-card-line rounded-[10px] px-4 py-3 pr-12 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ash-dim hover:text-ash transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {status === "error" && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-flame text-[0.84rem] text-center"
              >
                Incorrect password. Try again.
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading" || !password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full grad-flame text-[#110603] font-bold text-[0.95rem] py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-50"
            >
              {status === "loading" ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-ash-dim text-[0.75rem] mt-6 font-mono">
          Phoenix Ecosystem · Admin Only
        </p>
      </motion.div>
    </div>
  );
}