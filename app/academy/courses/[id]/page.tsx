"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmberField from "@/components/EmberField";
import QuizSection from "@/components/QuizSection";
import CertificateModal from "@/components/CertificateModal";
import PaymentModal from "@/components/PaymentModal";
import { Course, CourseEnrollment } from "@/lib/courses-types";
import {
  Download,
  CheckCircle2,
  Lock,
  ArrowRight,
  Award,
  Layers,
  Clock,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [enrollment, setEnrollment] = useState<CourseEnrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [verifyingPayment, setVerifyingPayment] = useState(false);

  // Modals state
  const [showCertModal, setShowCertModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<"course_enrollment" | "certificate_claim">("course_enrollment");

  // Check if returning from Paystack / Pvium checkout callback
  useEffect(() => {
    async function checkPaymentCallback() {
      const paymentParam = searchParams.get("payment");
      const ref = searchParams.get("ref") || searchParams.get("reference") || searchParams.get("trxref");
      const pType = searchParams.get("type") || "course_enrollment";
      const provider = searchParams.get("provider") || (ref?.startsWith("PHX-PVIUM") ? "pvium" : "paystack");

      if (paymentParam === "verify" && ref && courseId) {
        setVerifyingPayment(true);
        try {
          const res = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: ref,
              provider,
              courseId,
              userId: "current-user",
              paymentType: pType,
            }),
          });
          const data = await res.json();
          if (data.verified && data.enrollment) {
            setEnrollment(data.enrollment);
            if (pType === "certificate_claim") {
              setShowCertModal(true);
            }
          }
        } catch (e) {
          console.error("Verification failed:", e);
        } finally {
          setVerifyingPayment(false);
          // clean URL query
          router.replace(`/academy/courses/${courseId}`);
        }
      }
    }
    if (courseId) {
      checkPaymentCallback();
    }
  }, [courseId, searchParams, router]);

  // Fetch Course and Current User Enrollment
  useEffect(() => {
    async function loadData() {
      try {
        const [cRes, eRes] = await Promise.all([
          fetch(`/api/courses/${courseId}`).then((r) => r.json()),
          fetch(`/api/enrollments?userId=current-user&courseId=${courseId}`).then((r) => r.json()),
        ]);

        if (cRes && !cRes.error) {
          setCourse(cRes);
          // Auto-expand first module
          if (cRes.modules && cRes.modules.length > 0) {
            setExpandedModule(cRes.modules[0].id);
          }
        }
        if (eRes && !eRes.error) {
          setEnrollment(eRes);
        }
      } catch (e) {
        console.error("Error loading course details:", e);
      } finally {
        setLoading(false);
      }
    }
    if (courseId) loadData();
  }, [courseId]);

  // Handle Enrollment Initialization
  const handleEnroll = async () => {
    if (!course) return;

    if (course.tier === "paid" && (!enrollment || !enrollment.coursePaid)) {
      setPaymentType("course_enrollment");
      setShowPaymentModal(true);
      return;
    }

    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          userEmail: "student@phoenix.org",
          courseId: course.id,
        }),
      });
      const data = await res.json();
      setEnrollment(data);
    } catch (e) {
      console.error("Enrollment failed:", e);
    }
  };

  // Handle Quiz Completed in a module
  const handleQuizCompleted = async (moduleId: string, score: number) => {
    if (!course) return;

    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          userEmail: "student@phoenix.org",
          courseId: course.id,
          action: "submit_quiz",
          moduleId,
          score,
        }),
      });
      const updated = await res.json();
      setEnrollment(updated);
    } catch (e) {
      console.error("Quiz submission update failed:", e);
    }
  };

  // Handle Certificate Claiming
  const handleClaimCertificate = () => {
    if (!course || !enrollment) return;

    // For free courses: user must pay certificate fee
    if (course.tier === "free" && !enrollment.certPaid) {
      setPaymentType("certificate_claim");
      setShowPaymentModal(true);
      return;
    }

    // For paid courses: certificate is immediately unlocked
    setShowCertModal(true);
  };

  const handlePaymentSuccess = async () => {
    setShowPaymentModal(false);
    if (!course) return;

    if (paymentType === "course_enrollment") {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          userEmail: "student@phoenix.org",
          courseId: course.id,
          action: "mark_course_paid",
        }),
      });
      const data = await res.json();
      setEnrollment(data);
    } else if (paymentType === "certificate_claim") {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "current-user",
          userEmail: "student@phoenix.org",
          courseId: course.id,
          action: "mark_cert_paid",
        }),
      });
      const data = await res.json();
      setEnrollment(data);
      setShowCertModal(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink text-bone flex items-center justify-center font-mono text-sm">
        Loading Course Curriculum...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-ink text-bone flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-2xl">Course Not Found</h2>
        <Link href="/academy/courses" className="mt-4 text-xs font-mono text-ember hover:underline">
          ← Return to Academy Courses
        </Link>
      </div>
    );
  }

  const isEnrolled = !!enrollment;
  const isPaidCourse = course.tier === "paid";
  const hasAccessToMaterials = !isPaidCourse || (enrollment && enrollment.coursePaid);
  const allModulesPassed = !!enrollment?.allModulesPassed;

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--bone)] flex flex-col justify-between selection:bg-[var(--flame)] selection:text-[var(--bone)]">
      <Navbar />

      <main className="flex-1 relative overflow-hidden pb-24">
        {/* Course Header */}
        <div className="relative pt-12 pb-10 border-b border-card-line bg-card/30">
          <div className="max-w-[1180px] mx-auto px-6">
            <Link
              href="/academy/courses"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ash hover:text-ember transition-colors mb-6"
            >
              ← Back to Courses
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-[750px]">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-ink border border-card-line text-ember font-bold">
                    {course.tier === "free" ? "Free Course" : "Paid Track"}
                  </span>
                  <span className="font-mono text-xs text-ash-dim">
                    {course.level} · {course.category}
                  </span>
                </div>

                <h1 className="font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-bone">
                  {course.title}
                </h1>
                <p className="mt-3 text-ash text-sm md:text-base leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mt-6 font-mono text-xs text-ash">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-ember" />
                    <span>{course.estimatedHours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers size={14} className="text-ember" />
                    <span>{course.modules.length} Modules</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={14} className="text-ember" />
                    <span>70% Passing Threshold</span>
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="p-6 rounded-2xl bg-card border border-card-line shrink-0 w-full lg:w-80 shadow-xl">
                <div className="mb-4">
                  <div className="text-ash-dim font-mono text-[11px] uppercase">Tuition & Material</div>
                  <div className="font-display text-2xl text-bone mt-1">
                    {course.tier === "free" ? (
                      <span className="text-emerald-400">FREE ACCESS</span>
                    ) : (
                      <>
                        ₦{course.priceNgn.toLocaleString()}{" "}
                        <span className="text-xs font-mono text-ash font-normal">/ ${course.priceUsd}</span>
                      </>
                    )}
                  </div>
                </div>

                {!isEnrolled || (isPaidCourse && !enrollment.coursePaid) ? (
                  <button
                    type="button"
                    onClick={handleEnroll}
                    className="w-full py-3.5 px-4 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg"
                  >
                    {isPaidCourse ? "Enroll & Unlock Modules" : "Start Course Free"} <ArrowRight size={14} />
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
                      <CheckCircle2 size={16} /> Enrolled & Active
                    </div>

                    {allModulesPassed && (
                      <button
                        type="button"
                        onClick={handleClaimCertificate}
                        className="w-full py-3 px-4 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                      >
                        <Award size={16} />
                        {course.tier === "free" && !enrollment.certPaid
                          ? "Pay & Download Certificate"
                          : "View Official Certificate"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modules & Quizzes Syllabus */}
        <section className="py-12">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl text-bone">Course Modules & Materials</h2>
                <p className="text-xs text-ash mt-1">
                  Download each module&apos;s PDF guide, read through, and score &gt;= 70% on the quiz to advance.
                </p>
              </div>

              {enrollment && (
                <div className="font-mono text-xs text-ash bg-card px-4 py-2 rounded-xl border border-card-line">
                  Progress:{" "}
                  <strong className="text-ember">
                    {
                      Object.values(enrollment.moduleProgress || {}).filter((p) => p.passed).length
                    }{" "}
                    / {course.modules.length}
                  </strong>{" "}
                  Passed
                </div>
              )}
            </div>

            {/* Modules List Accordion */}
            <div className="space-y-4">
              {course.modules.map((mod, idx) => {
                const isExpanded = expandedModule === mod.id;
                const progress = enrollment?.moduleProgress?.[mod.id];
                const isPassed = !!progress?.passed;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isPassed
                        ? "border-emerald-500/30 bg-card/60"
                        : "border-card-line bg-card/40"
                    }`}
                  >
                    {/* Module Header Bar */}
                    <div
                      onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                      className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-card transition-colors select-none"
                    >
                      <div className="flex items-start md:items-center gap-4">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                            isPassed
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-ink border border-card-line text-ember"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 size={18} /> : `0${idx + 1}`}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-base text-bone">{mod.title}</h3>
                            {isPassed && (
                              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                Passed ({progress?.bestScore}%)
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-ash mt-1 max-w-2xl">{mod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end md:self-center">
                        <span className="text-xs font-mono text-ash-dim hidden sm:inline">
                          {mod.duration}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={18} className="text-ash" />
                        ) : (
                          <ChevronDown size={18} className="text-ash" />
                        )}
                      </div>
                    </div>

                    {/* Module Content Expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-card-line/50 p-6 bg-ink/40"
                        >
                          {/* PDF Download Section */}
                          <div className="p-4 rounded-xl bg-card border border-card-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-lg bg-ink border border-card-line text-ember">
                                <BookOpen size={20} />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs text-bone">
                                  Module Curriculum Guide (PDF)
                                </h4>
                                <p className="text-[11px] text-ash mt-0.5">
                                  {mod.pdfFileName || "Official Module Curriculum.pdf"}
                                </p>
                              </div>
                            </div>

                            {hasAccessToMaterials ? (
                              <a
                                href={mod.pdfUrl}
                                download
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-ember text-ember hover:bg-ember/10 text-xs font-mono uppercase tracking-wider transition-colors shrink-0"
                              >
                                <Download size={14} /> Download PDF Material
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={handleEnroll}
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-card-line text-ash text-xs font-mono uppercase tracking-wider shrink-0"
                              >
                                <Lock size={14} /> Enroll to Download PDF
                              </button>
                            )}
                          </div>

                          {/* Quiz Section Component */}
                          {hasAccessToMaterials ? (
                            <QuizSection
                              module={mod}
                              moduleIndex={idx}
                              initialBestScore={progress?.bestScore}
                              isPassed={isPassed}
                              onQuizCompleted={(score) => handleQuizCompleted(mod.id, score)}
                            />
                          ) : (
                            <div className="p-6 rounded-xl border border-card-line bg-card/20 text-center">
                              <Lock size={24} className="text-ash mx-auto mb-2 opacity-50" />
                              <p className="text-xs text-ash">
                                Enroll in this course to take the module quiz and earn your certification.
                              </p>
                              <button
                                type="button"
                                onClick={handleEnroll}
                                className="mt-3 px-4 py-2 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                              >
                                Enroll Now
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Completion Banner */}
            {allModulesPassed && (
              <div className="mt-12 p-8 rounded-2xl border border-ember bg-gradient-to-r from-card via-[#201007] to-card text-center relative overflow-hidden shadow-2xl">
                <div className="relative z-10 max-w-xl mx-auto">
                  <Award size={48} className="text-ember mx-auto mb-3 animate-pulse" />
                  <h3 className="font-display text-2xl text-bone">
                    Congratulations! You Have Passed All Modules!
                  </h3>
                  <p className="text-xs text-ash mt-2 leading-relaxed">
                    You have achieved a minimum 70% passing grade across all modules. Your official Phoenix Ecosystem certification is ready.
                  </p>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={handleClaimCertificate}
                      className="px-8 py-3.5 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
                    >
                      <Award size={16} />
                      {course.tier === "free" && !enrollment?.certPaid
                        ? `Pay Certificate Fee (₦${course.certPriceNgn.toLocaleString()} / $${course.certPriceUsd})`
                        : "Download / View Certificate"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Certificate Modal */}
      {showCertModal && (
        <CertificateModal
          studentName={enrollment?.userName || "Phoenix Scholar"}
          courseTitle={course.title}
          certificateId={enrollment?.certificateId || "PHX-ACAD-001"}
          completionDate={enrollment?.completedAt || new Date().toISOString()}
          tier={course.tier}
          onClose={() => setShowCertModal(false)}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          courseTitle={course.title}
          courseId={course.id}
          userEmail={enrollment?.userEmail || "scholar@phoenix.org"}
          paymentType={paymentType}
          amountNgn={paymentType === "course_enrollment" ? course.priceNgn : course.certPriceNgn}
          amountUsd={paymentType === "course_enrollment" ? course.priceUsd : course.certPriceUsd}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}
