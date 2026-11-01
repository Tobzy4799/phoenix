"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import ScrollReveal, { revealItem } from "@/components/ScrollReveal";
import MotionCard from "@/components/MotionCard";
import { Course } from "@/lib/courses-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Download,
} from "lucide-react";

export default function AcademyCoursesPage() {
  const [activeTab, setActiveTab] = useState<"free" | "paid">("free");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (e) {
        console.error("Failed to load courses:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const filteredCourses = courses.filter((c) => c.tier === activeTab && c.published);

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--bone)] flex flex-col justify-between selection:bg-[var(--flame)] selection:text-[var(--bone)]">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Top ambient glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "300px",
            background:
              "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,77,28,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Hero Section with Ember Particles */}
        <section className="relative pt-16 pb-12 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-0"
          >
            <EmberField count={30} />
          </div>

          <div className="max-w-[1180px] mx-auto px-6 relative z-10">
            {/* Breadcrumb back to Academy Overview */}
            <div className="mb-6">
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ash hover:text-ember transition-colors"
              >
                ← Back to Academy Overview
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="max-w-[800px]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--card-line)] bg-[var(--card)] text-[var(--ember)] text-xs font-mono uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--flame)] animate-pulse" />
                Academy Curriculum Tracks
              </div>
              <h1 className="font-display text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.05] tracking-tight">
                Modular Web3 Courses & <span className="flame-text">Credentials</span>
              </h1>
              <p className="mt-4 text-ash text-[1.05rem] leading-relaxed max-w-[650px]">
                Dive into verified curriculum modules with downloadable course materials,
                interactive quizzes (requiring 70% passing threshold), and official Phoenix Certificates.
              </p>
            </motion.div>

            {/* Free vs Paid Tabs Switcher */}
            <div className="mt-10 flex flex-wrap items-center gap-3 border-b border-card-line pb-4">
              <button
                type="button"
                onClick={() => setActiveTab("free")}
                className={`relative px-6 py-3 rounded-xl font-display text-sm tracking-wide transition-all flex items-center gap-2.5 ${
                  activeTab === "free"
                    ? "bg-card border border-ember text-bone shadow-[0_0_20px_-5px_rgba(255,166,43,0.3)]"
                    : "bg-ink/50 border border-card-line text-ash hover:text-bone hover:border-ash/40"
                }`}
              >
                <BookOpen size={16} className={activeTab === "free" ? "text-ember" : "text-ash"} />
                Free Courses
                <span className="ml-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-ink border border-card-line text-ash">
                  {courses.filter((c) => c.tier === "free").length}
                </span>
                {activeTab === "free" && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 grad-flame"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("paid")}
                className={`relative px-6 py-3 rounded-xl font-display text-sm tracking-wide transition-all flex items-center gap-2.5 ${
                  activeTab === "paid"
                    ? "bg-card border border-flame text-bone shadow-[0_0_20px_-5px_rgba(255,77,28,0.3)]"
                    : "bg-ink/50 border border-card-line text-ash hover:text-bone hover:border-ash/40"
                }`}
              >
                <Award size={16} className={activeTab === "paid" ? "text-flame" : "text-ash"} />
                Paid Mastery Courses
                <span className="ml-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-ink border border-card-line text-ash">
                  {courses.filter((c) => c.tier === "paid").length}
                </span>
                {activeTab === "paid" && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 grad-flame"
                  />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Tab Context Banner */}
        <section className="pb-8">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="p-4 rounded-xl border border-card-line bg-card/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-ink border border-card-line text-ember">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-bone font-bold">
                    {activeTab === "free"
                      ? "Free Access Model"
                      : "Paid Professional Tier"}
                  </h4>
                  <p className="text-xs text-ash mt-0.5">
                    {activeTab === "free"
                      ? "All PDF materials and quizzes are 100% free. Once you finish all quizzes (>=70%), pay a nominal fee to claim your verified certificate."
                      : "Full access includes hands-on agency curriculum, materials, quizzes, and instant certificate issuance upon 70% passing completion."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-6 pb-24">
          <div className="max-w-[1180px] mx-auto px-6">
            {loading ? (
              <div className="text-center py-20 text-ash font-mono text-sm">
                Loading Academy Courses...
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-20 border border-card-line rounded-2xl bg-card/20">
                <BookOpen size={40} className="text-ash mx-auto mb-3 opacity-40" />
                <h3 className="font-display text-lg text-bone">No Courses Available</h3>
                <p className="text-xs text-ash mt-1">
                  New courses in this tier will be published shortly by our academic team.
                </p>
              </div>
            ) : (
              <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCourses.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                  >
                    <MotionCard>
                      <div className="flex flex-col h-full justify-between p-2">
                        <div>
                          {/* Tags row */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-ink border border-card-line text-ember">
                              {course.badge}
                            </span>
                            <span className="font-mono text-[11px] text-ash-dim">
                              {course.level}
                            </span>
                          </div>

                          {/* Title & Tagline */}
                          <h3 className="font-display text-xl text-bone group-hover:text-ember transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-ash mt-2 leading-relaxed line-clamp-2">
                            {course.tagline || course.description}
                          </p>

                          {/* Meta stats */}
                          <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-card-line/50 font-mono text-[11px]">
                            <div>
                              <div className="text-ash-dim uppercase text-[9px]">Duration</div>
                              <div className="text-bone font-semibold mt-0.5 flex items-center gap-1">
                                <Clock size={12} className="text-ember" />
                                {course.estimatedHours}
                              </div>
                            </div>
                            <div>
                              <div className="text-ash-dim uppercase text-[9px]">Modules</div>
                              <div className="text-bone font-semibold mt-0.5 flex items-center gap-1">
                                <Layers size={12} className="text-ember" />
                                {course.modules.length} Modules
                              </div>
                            </div>
                            <div>
                              <div className="text-ash-dim uppercase text-[9px]">Certificate</div>
                              <div className="text-bone font-semibold mt-0.5">
                                {course.tier === "free" ? "Paid at End" : "Included"}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer / Action */}
                        <div className="pt-2 flex items-center justify-between gap-4">
                          <div>
                            {course.tier === "free" ? (
                              <div>
                                <span className="font-display text-lg text-emerald-400">FREE</span>
                                <span className="block text-[10px] font-mono text-ash-dim">
                                  Cert: ₦{course.certPriceNgn.toLocaleString()} / ${course.certPriceUsd}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <div className="font-display text-lg text-bone">
                                  ₦{course.priceNgn.toLocaleString()}
                                </div>
                                <span className="block text-[10px] font-mono text-ash-dim">
                                  or ${course.priceUsd} USDT
                                </span>
                              </div>
                            )}
                          </div>

                          <Link
                            href={`/academy/courses/${course.id}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md hover:shadow-flame/20"
                          >
                            Explore Course <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </MotionCard>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
