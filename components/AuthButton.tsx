"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";
import { LogIn, LogOut } from "lucide-react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) return null;

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-wider text-ash-dim hover:text-flame transition-colors border border-card-line hover:border-flame/30 rounded-full px-3 py-1.5"
      >
        <LogOut size={13} />
        Logout
      </button>
    );
  }

  return (
    <Link
      href={`/login?redirect=${pathname}`}
      className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-wider text-ash hover:text-ember transition-colors border border-card-line hover:border-ember rounded-full px-3 py-1.5"
    >
      <LogIn size={13} />
      Login
    </Link>
  );
}