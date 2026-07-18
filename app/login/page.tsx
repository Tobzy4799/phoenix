"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import EmberField from "@/components/EmberField";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/agency";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const supabase = createSupabaseBrowserClient();
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Incorrect email or password. Try again.");
      setStatus("error");
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="bg-card border border-card-line rounded-[20px] p-8">
      <div className="flex items-center gap-2.5 mb-6">
        <LogIn size={18} className="text-ember" />
        <h1 className="font-bold text-[1.05rem]">Sign In</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-semibold text-bone">Email</span>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-dim" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
              placeholder="you@email.com"
              required
              autoFocus
              className="w-full bg-ink/60 border border-card-line rounded-[10px] pl-10 pr-4 py-3 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-semibold text-bone">Password</span>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash-dim" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setStatus("idle"); }}
              placeholder="Your password"
              required
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

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-flame text-[0.84rem] text-center"
          >
            {error}
          </motion.p>
        )}

        <div className="text-center">
          <Link
            href="/reset-password"
            className="text-[0.82rem] text-ash-dim hover:text-ember transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-1 rounded-full grad-flame text-[#110603] font-bold text-[0.95rem] py-3.5 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-50"
        >
          {status === "loading" ? "Signing in..." : "Sign In"}
        </motion.button>
      </form>

      <p className="text-center text-ash text-[0.84rem] mt-5">
        Don&apos;t have an account?{" "}
        <Link
          href={`/signup?redirect=${redirect}`}
          className="text-ember hover:text-bone transition-colors font-semibold"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
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
              Members Only
            </span>
          </div>

          <Suspense fallback={
            <div className="bg-card border border-card-line rounded-[20px] p-8 text-center text-ash text-[0.9rem]">
              Loading...
            </div>
          }>
            <LoginForm />
          </Suspense>

          <p className="text-center text-ash-dim text-[0.72rem] mt-5 font-mono">
            Phoenix Ecosystem · Members Only
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}