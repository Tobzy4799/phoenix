"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

const ROLES = [
  "KOL / X Influencer",
  "Content Writer",
  "Community Manager",
  "Campus Ambassador",
  "Spaces Host",
  "Video Creator",
  "Meme / Design Creator",
];
const AUDIENCE_SIZES = ["Under 1K", "1K – 5K", "5K – 20K", "20K – 100K", "100K+"];
const NICHES = [
  "DeFi", "NFTs", "Gaming / GameFi", "Infrastructure / L1s",
  "DAOs & Governance", "AI + Crypto", "General Web3", "African Tech",
];
const EXPERIENCES = [
  "New to Web3 — willing to learn",
  "Some experience — done a few campaigns",
  "Experienced — have receipts to share",
];

function Field({
  label, children, required,
}: {
  label: string; children: React.ReactNode; required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.84rem] font-semibold text-bone">
        {label}
        {required && <span className="text-flame ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full bg-ink/60 border border-card-line rounded-[10px] px-4 py-3 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors";

function Input({ required: _req, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputClass} resize-none`} {...props} />;
}
function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${inputClass} cursor-pointer`} {...props}>{children}</select>;
}

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "", email: "", twitter: "", telegram: "", otherSocials: "",
    roles: [] as string[], audienceSize: "", niches: [] as string[],
    experience: "", whyPhoenix: "", sampleWork: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleMulti(field: "roles" | "niches", value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/submissions/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "join", submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen">
        <EmberField count={28} />

        <div className="relative z-10 max-w-[760px] mx-auto px-7 pt-14 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-12"
          >
            <Link
              href="/agency"
              className="inline-flex items-center gap-2 text-ash text-[0.84rem] hover:text-ember transition-colors mb-6"
            >
              ← Back to Agency
            </Link>
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-ember font-semibold inline-flex items-center gap-2.5">
              <span className="w-4.5 h-px grad-flame inline-block" />
              Join Phoenix
            </span>
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.04] tracking-tight mt-4">
              Bring your audience.
              <br />
              We&apos;ll bring the campaigns.
            </h1>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed max-w-[560px]">
              Tell us who you are and what you do — we&apos;ll match you to campaigns that fit
              your style, audience, and niche. No minimum follower count. Just real presence.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-ember/30 rounded-[20px] p-12 text-center"
              >
                <div className="text-5xl mb-5">✦</div>
                <h2 className="font-display text-[2rem] tracking-tight">
                  You&apos;re in the kitchen.
                </h2>
                <p className="mt-4 text-ash text-[1rem] leading-relaxed max-w-[420px] mx-auto">
                  We&apos;ve received your application. We review every submission personally
                  and will reach out via Telegram or email within a few days.
                </p>
                <Link
                  href="/agency"
                  className="inline-flex items-center gap-2 mt-8 rounded-full border border-ember/40 text-ember font-bold text-[0.88rem] px-6 py-3"
                >
                  Back to Agency
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-7"
              >
                {/* Identity */}
                <fieldset className="bg-card border border-card-line rounded-[18px] p-7 flex flex-col gap-5">
                  <legend className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember px-1 mb-1">
                    Who You Are
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required>
                      <Input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                    </Field>
                    <Field label="Email" required>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Twitter / X Handle" required>
                      <Input name="twitter" value={form.twitter} onChange={handleChange} placeholder="@yourhandle" required />
                    </Field>
                    <Field label="Telegram">
                      <Input name="telegram" value={form.telegram} onChange={handleChange} placeholder="@handle" />
                    </Field>
                  </div>
                  <Field label="Other Socials / Links">
                    <Input name="otherSocials" value={form.otherSocials} onChange={handleChange} placeholder="YouTube, TikTok, LinkedIn, personal site..." />
                  </Field>
                </fieldset>

                {/* What You Do */}
                <fieldset className="bg-card border border-card-line rounded-[18px] p-7 flex flex-col gap-5">
                  <legend className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember px-1 mb-1">
                    What You Do
                  </legend>
                  <Field label="Which roles fit you? (select all that apply)">
                    <div className="flex flex-wrap gap-2.5 mt-1">
                      {ROLES.map((r) => (
                        <button
                          type="button" key={r}
                          onClick={() => toggleMulti("roles", r)}
                          className={`px-4 py-2 rounded-full text-[0.82rem] font-semibold border transition-all ${
                            form.roles.includes(r)
                              ? "grad-flame text-[#110603] border-transparent"
                              : "border-card-line text-ash hover:border-ember hover:text-ember"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Your audience / following size" required>
                    <Select name="audienceSize" value={form.audienceSize} onChange={handleChange} required>
                      <option value="">Select range...</option>
                      {AUDIENCE_SIZES.map((a) => <option key={a} value={a}>{a}</option>)}
                    </Select>
                  </Field>
                  <Field label="Your niche(s) — select what applies">
                    <div className="flex flex-wrap gap-2.5 mt-1">
                      {NICHES.map((n) => (
                        <button
                          type="button" key={n}
                          onClick={() => toggleMulti("niches", n)}
                          className={`px-4 py-2 rounded-full text-[0.82rem] font-semibold border transition-all ${
                            form.niches.includes(n)
                              ? "grad-flame text-[#110603] border-transparent"
                              : "border-card-line text-ash hover:border-ember hover:text-ember"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Web3 campaign experience" required>
                    <Select name="experience" value={form.experience} onChange={handleChange} required>
                      <option value="">Select...</option>
                      {EXPERIENCES.map((ex) => <option key={ex} value={ex}>{ex}</option>)}
                    </Select>
                  </Field>
                </fieldset>

                {/* Final Details */}
                <fieldset className="bg-card border border-card-line rounded-[18px] p-7 flex flex-col gap-5">
                  <legend className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember px-1 mb-1">
                    Final Details
                  </legend>
                  <Field label="Why do you want to work with Phoenix?" required>
                    <Textarea
                      name="whyPhoenix" value={form.whyPhoenix} onChange={handleChange}
                      placeholder="Tell us what draws you here and what you're hoping to get out of it."
                      rows={4} required
                    />
                  </Field>
                  <Field label="Sample work / past campaigns">
                    <Textarea
                      name="sampleWork" value={form.sampleWork} onChange={handleChange}
                      placeholder="Links to past posts, threads, campaigns, or anything that shows what you do."
                      rows={3}
                    />
                  </Field>
                </fieldset>

                {status === "error" && (
                  <p className="text-flame text-[0.88rem] text-center">
                    Something went wrong. Please try again or DM us on Telegram.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full grad-flame text-[#110603] font-bold text-[1rem] py-4 px-8 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "✦ Submit Application"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}