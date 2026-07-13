"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import { motion, AnimatePresence } from "framer-motion";
import {Flame, Rocket} from "lucide-react"

type FormState = "idle" | "submitting" | "success" | "error";

const BUDGETS = [
  "$1,500/mo (Spark)",
  "$3,000/mo (Blaze)",
  "$5,000/mo (Inferno)",
  "Custom / Not sure yet",
];
const GOALS = [
  "Community Growth",
  "KOL Campaign",
  "Token Launch",
  "Campus Activation",
  "Content Strategy",
  "Full Growth Package",
];
const TIMELINES = [
  "ASAP",
  "Within 2 weeks",
  "Within a month",
];

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
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
  return (
    <select className={`${inputClass} cursor-pointer`} {...props}>
      {children}
    </select>
  );
}

export default function HirePage() {
  const [form, setForm] = useState({
    projectName: "",
    website: "",
    contactName: "",
    email: "",
    telegram: "",
    twitter: "",
    description: "",
    goals: [] as string[],
    budget: "",
    timeline: "",
    extraNotes: "",
  });
  const [status, setStatus] = useState<FormState>("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleGoal(goal: string) {
    setForm((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/submissions/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: "hire",
          submittedAt: new Date().toISOString(),
        }),
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

      {/* Single flowing page — embers behind everything */}
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
              Hire Phoenix
            </span>
            <h1 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.04] tracking-tight mt-4">
              Let&apos;s grow your project.
            </h1>
            <p className="mt-4 text-ash text-[1rem] leading-relaxed max-w-[560px]">
              Fill this in and we&apos;ll come back to you within 48 hours with a tailored
              proposal — no generic decks, no sales calls you didn&apos;t ask for.
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
                <div className="text-5xl mb-5"><Flame size={16}/></div>
                <h2 className="font-display text-[2rem] tracking-tight">We got you.</h2>
                <p className="mt-4 text-ash text-[1rem] leading-relaxed max-w-[420px] mx-auto">
                  Your submission landed. We&apos;ll review it and hit you back within 48
                  hours with a proper proposal.
                </p>
                <Link
                  href="/agency"
                  className="inline-flex items-center gap-2 mt-8 rounded-full grad-flame text-[#110603] font-bold text-[0.88rem] px-6 py-3"
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
                {/* Project Info */}
                <fieldset className="bg-card border border-card-line rounded-[18px] p-7 flex flex-col gap-5">
                  <legend className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember px-1 mb-1">
                    Project Info
                  </legend>
                  <Field label="Project Name" required>
                    <Input
                      name="projectName"
                      value={form.projectName}
                      onChange={handleChange}
                      placeholder="e.g. SentinelDAO"
                      required
                    />
                  </Field>
                  <Field label="Website / Linktree">
                    <Input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="https://"
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Twitter / X Handle">
                      <Input
                        name="twitter"
                        value={form.twitter}
                        onChange={handleChange}
                        placeholder="@yourproject"
                      />
                    </Field>
                    <Field label="Telegram">
                      <Input
                        name="telegram"
                        value={form.telegram}
                        onChange={handleChange}
                        placeholder="@handle or t.me/link"
                      />
                    </Field>
                  </div>
                  <Field label="Describe your project" required>
                    <Textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="What does it do? What chain? What stage are you at?"
                      rows={4}
                      required
                    />
                  </Field>
                </fieldset>

                {/* Campaign Goals */}
                <fieldset className="bg-card border border-card-line rounded-[18px] p-7 flex flex-col gap-5">
                  <legend className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember px-1 mb-1">
                    Campaign Goals
                  </legend>
                  <Field label="What are you looking for? (select all that apply)">
                    <div className="flex flex-wrap gap-2.5 mt-1">
                      {GOALS.map((g) => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => toggleGoal(g)}
                          className={`px-4 py-2 rounded-full text-[0.82rem] font-semibold border transition-all ${
                            form.goals.includes(g)
                              ? "grad-flame text-[#110603] border-transparent"
                              : "border-card-line text-ash hover:border-ember hover:text-ember"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Budget range" required>
                    <Select name="budget" value={form.budget} onChange={handleChange} required>
                      <option value="">Select a tier...</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Timeline">
                    <Select name="timeline" value={form.timeline} onChange={handleChange}>
                      <option value="">When do you want to start?</option>
                      {TIMELINES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </Select>
                  </Field>
                </fieldset>

                {/* Contact */}
                <fieldset className="bg-card border border-card-line rounded-[18px] p-7 flex flex-col gap-5">
                  <legend className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember px-1 mb-1">
                    Your Contact Details
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Your Name" required>
                      <Input
                        name="contactName"
                        value={form.contactName}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                      />
                    </Field>
                    <Field label="Email" required>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@project.xyz"
                        required
                      />
                    </Field>
                  </div>
                  <Field label="Anything else we should know?">
                    <Textarea
                      name="extraNotes"
                      value={form.extraNotes}
                      onChange={handleChange}
                      placeholder="Previous campaigns, specific KOLs in mind, special requirements..."
                      rows={3}
                    />
                  </Field>
                </fieldset>

                {status === "error" && (
                  <p className="text-flame text-[0.88rem] text-center">
                    Something went wrong. Please try again or reach out on Telegram.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full grad-flame text-[#110603] font-bold text-[1rem] py-4 px-8 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "🚀 Submit Campaign Brief"}
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