"use client";

import { useState } from "react";
import { Course, Module, Question } from "@/lib/courses-types";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  FileText,
  HelpCircle,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AdminCoursesTabProps {
  courses: Course[];
  onCourseUpdated: () => void;
}

export default function AdminCoursesTab({ courses, onCourseUpdated }: AdminCoursesTabProps) {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [saving, setSaving] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  // New blank course template
  const handleAddNew = () => {
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      slug: `new-course-${Date.now()}`,
      title: "New Academy Course",
      tagline: "Short compelling course summary",
      description: "Comprehensive description of this course curriculum.",
      tier: "free",
      priceNgn: 0,
      priceUsd: 0,
      certPriceNgn: 7500,
      certPriceUsd: 5,
      level: "Beginner",
      category: "Ecosystem",
      badge: "Certificate Track",
      estimatedHours: "3 Hours",
      published: true,
      createdAt: new Date().toISOString(),
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          title: "Module 1: Getting Started",
          description: "Foundational concepts and principles.",
          duration: "45 mins",
          pdfUrl: "/materials/web3-fundamentals-module-1.pdf",
          pdfFileName: "Module_1_Guide.pdf",
          questions: [
            {
              id: `q-${Date.now()}-1`,
              question: "Sample Question 1?",
              options: ["Correct Option", "Incorrect Option A", "Incorrect Option B", "Incorrect Option C"],
              correctAnswerIndex: 0,
              explanation: "Explanation for question 1.",
            },
          ],
        },
      ],
    };
    setEditingCourse(newCourse);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;
    setSaving(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCourse),
      });
      if (res.ok) {
        setEditingCourse(null);
        onCourseUpdated();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this course?")) return;
    try {
      const res = await fetch("/api/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        onCourseUpdated();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Module & Question mutation helpers for editingCourse
  const addModule = () => {
    if (!editingCourse) return;
    const newMod: Module = {
      id: `mod-${Date.now()}`,
      title: `Module ${editingCourse.modules.length + 1}: Title`,
      description: "Module curriculum description",
      duration: "45 mins",
      pdfUrl: "/materials/web3-fundamentals-module-1.pdf",
      pdfFileName: "Module_Guide.pdf",
      questions: [],
    };
    setEditingCourse({
      ...editingCourse,
      modules: [...editingCourse.modules, newMod],
    });
  };

  const removeModule = (mIdx: number) => {
    if (!editingCourse) return;
    const mods = [...editingCourse.modules];
    mods.splice(mIdx, 1);
    setEditingCourse({ ...editingCourse, modules: mods });
  };

  const updateModuleField = (mIdx: number, field: keyof Module, value: any) => {
    if (!editingCourse) return;
    const mods = [...editingCourse.modules];
    mods[mIdx] = { ...mods[mIdx], [field]: value };
    setEditingCourse({ ...editingCourse, modules: mods });
  };

  const addQuestion = (mIdx: number) => {
    if (!editingCourse) return;
    const newQ: Question = {
      id: `q-${Date.now()}`,
      question: "New quiz question?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswerIndex: 0,
      explanation: "Explanation of correct answer",
    };
    const mods = [...editingCourse.modules];
    mods[mIdx].questions = [...(mods[mIdx].questions || []), newQ];
    setEditingCourse({ ...editingCourse, modules: mods });
  };

  const removeQuestion = (mIdx: number, qIdx: number) => {
    if (!editingCourse) return;
    const mods = [...editingCourse.modules];
    mods[mIdx].questions.splice(qIdx, 1);
    setEditingCourse({ ...editingCourse, modules: mods });
  };

  const updateQuestion = (mIdx: number, qIdx: number, updated: Question) => {
    if (!editingCourse) return;
    const mods = [...editingCourse.modules];
    mods[mIdx].questions[qIdx] = updated;
    setEditingCourse({ ...editingCourse, modules: mods });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs text-ember uppercase tracking-wider">
            Academy Management
          </span>
          <h2 className="font-display text-2xl text-bone mt-1">Course Catalog & Quizzes</h2>
          <p className="text-xs text-ash mt-0.5">
            Create, edit, or remove courses, module materials, and passing quizzes.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity self-start sm:self-auto"
        >
          <Plus size={16} /> Create New Course
        </button>
      </div>

      {/* Editing Form Modal / Inline Sheet */}
      {editingCourse && (
        <div className="mb-10 p-6 rounded-2xl bg-card border border-ember/60 shadow-2xl relative">
          <div className="flex items-center justify-between border-b border-card-line pb-4 mb-6">
            <h3 className="font-display text-lg text-bone">
              {editingCourse.id.startsWith("course-") && editingCourse.title === "New Academy Course"
                ? "Add New Course"
                : `Edit: ${editingCourse.title}`}
            </h3>
            <button
              onClick={() => setEditingCourse(null)}
              className="p-1 rounded-lg text-ash hover:text-bone hover:bg-ink"
            >
              <X size={18} />
            </button>
          </div>

          {/* Basic Course Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-mono text-ash mb-1">Course Title</label>
              <input
                type="text"
                value={editingCourse.title}
                onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-ash mb-1">Tagline</label>
              <input
                type="text"
                value={editingCourse.tagline}
                onChange={(e) => setEditingCourse({ ...editingCourse, tagline: e.target.value })}
                className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-ash mb-1">Tier</label>
              <select
                value={editingCourse.tier}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, tier: e.target.value as "free" | "paid" })
                }
                className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
              >
                <option value="free">Free (Pay certificate upon quiz completion)</option>
                <option value="paid">Paid (Includes instant certificate)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-ash mb-1">Level & Category</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={editingCourse.level}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, level: e.target.value as any })
                  }
                  className="bg-ink/70 border border-card-line rounded-xl px-3 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
                <input
                  type="text"
                  value={editingCourse.category}
                  placeholder="Category"
                  onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                  className="bg-ink/70 border border-card-line rounded-xl px-3 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                />
              </div>
            </div>

            {/* Pricing Details */}
            {editingCourse.tier === "paid" ? (
              <>
                <div>
                  <label className="block text-xs font-mono text-ash mb-1">Price (Naira ₦)</label>
                  <input
                    type="number"
                    value={editingCourse.priceNgn}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, priceNgn: Number(e.target.value) })
                    }
                    className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-ash mb-1">Price (Crypto USD/USDT)</label>
                  <input
                    type="number"
                    value={editingCourse.priceUsd}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, priceUsd: Number(e.target.value) })
                    }
                    className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-mono text-ash mb-1">Certificate Fee (Naira ₦)</label>
                  <input
                    type="number"
                    value={editingCourse.certPriceNgn}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, certPriceNgn: Number(e.target.value) })
                    }
                    className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-ash mb-1">Certificate Fee (Crypto USD)</label>
                  <input
                    type="number"
                    value={editingCourse.certPriceUsd}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, certPriceUsd: Number(e.target.value) })
                    }
                    className="w-full bg-ink/70 border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
                  />
                </div>
              </>
            )}

            <div className="md:col-span-2">
              <label className="block text-xs font-mono text-ash mb-1">Description</label>
              <textarea
                rows={3}
                value={editingCourse.description}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, description: e.target.value })
                }
                className="w-full bg-ink/70 border border-card-line rounded-xl p-3 text-xs text-bone focus:border-ember focus:outline-none"
              />
            </div>
          </div>

          {/* Modules and Quizzes Editor */}
          <div className="border-t border-card-line pt-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-display text-sm text-bone">
                Modules & Quizzes ({editingCourse.modules.length})
              </h4>
              <button
                type="button"
                onClick={addModule}
                className="px-3 py-1.5 rounded-lg border border-ember text-ember text-xs font-mono hover:bg-ember/10 flex items-center gap-1.5"
              >
                <Plus size={14} /> Add Module
              </button>
            </div>

            <div className="space-y-6">
              {editingCourse.modules.map((mod, mIdx) => (
                <div
                  key={mod.id || mIdx}
                  className="p-4 rounded-xl border border-card-line bg-ink/50 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ember font-bold">
                      Module {mIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeModule(mIdx)}
                      className="text-ash hover:text-flame transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Module Title"
                      value={mod.title}
                      onChange={(e) => updateModuleField(mIdx, "title", e.target.value)}
                      className="bg-card border border-card-line rounded-lg px-3 py-2 text-xs text-bone focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g. 45 mins)"
                      value={mod.duration}
                      onChange={(e) => updateModuleField(mIdx, "duration", e.target.value)}
                      className="bg-card border border-card-line rounded-lg px-3 py-2 text-xs text-bone focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="PDF Material URL (or /materials/filename.pdf)"
                      value={mod.pdfUrl}
                      onChange={(e) => updateModuleField(mIdx, "pdfUrl", e.target.value)}
                      className="bg-card border border-card-line rounded-lg px-3 py-2 text-xs text-bone focus:outline-none md:col-span-2"
                    />
                  </div>

                  {/* Questions in this module */}
                  <div className="pt-2 pl-3 border-l-2 border-card-line space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-ash">
                        Quiz Questions ({mod.questions?.length || 0}) — 70% passing rule applies
                      </span>
                      <button
                        type="button"
                        onClick={() => addQuestion(mIdx)}
                        className="text-xs font-mono text-ember hover:underline flex items-center gap-1"
                      >
                        <Plus size={12} /> Add Question
                      </button>
                    </div>

                    {(mod.questions || []).map((q, qIdx) => (
                      <div
                        key={q.id || qIdx}
                        className="p-3 rounded-lg bg-card/60 border border-card-line/50 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            placeholder="Question text..."
                            value={q.question}
                            onChange={(e) => {
                              const updated = { ...q, question: e.target.value };
                              updateQuestion(mIdx, qIdx, updated);
                            }}
                            className="w-full bg-ink/70 border border-card-line rounded px-2.5 py-1.5 text-bone text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeQuestion(mIdx, qIdx)}
                            className="text-ash hover:text-flame shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-1.5">
                          {q.options.map((opt, optIdx) => (
                            <div key={optIdx} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`correct-${mIdx}-${qIdx}`}
                                checked={q.correctAnswerIndex === optIdx}
                                onChange={() => {
                                  const updated = { ...q, correctAnswerIndex: optIdx };
                                  updateQuestion(mIdx, qIdx, updated);
                                }}
                              />
                              <input
                                type="text"
                                value={opt}
                                placeholder={`Option ${optIdx + 1}`}
                                onChange={(e) => {
                                  const opts = [...q.options];
                                  opts[optIdx] = e.target.value;
                                  const updated = { ...q, options: opts };
                                  updateQuestion(mIdx, qIdx, updated);
                                }}
                                className="flex-1 bg-ink/70 border border-card-line rounded px-2 py-1 text-bone text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 pt-4 border-t border-card-line flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditingCourse(null)}
              className="px-5 py-2.5 rounded-xl border border-card-line text-xs font-mono text-ash hover:text-bone"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveCourse}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl grad-flame text-ink font-bold text-xs uppercase tracking-wider hover:opacity-95"
            >
              {saving ? "Saving Course..." : "Save & Publish Course"}
            </button>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        {courses.map((course) => {
          const isExpanded = expandedCourse === course.id;

          return (
            <div
              key={course.id}
              className="p-5 rounded-2xl bg-card border border-card-line hover:border-card-line/80 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-ink border border-card-line text-ember shrink-0">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          course.tier === "free"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-ember/10 text-ember border-ember/20"
                        }`}
                      >
                        {course.tier.toUpperCase()} TIER
                      </span>
                      <span className="font-mono text-xs text-ash-dim">
                        {course.level} · {course.category}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-bone">{course.title}</h3>
                    <p className="text-xs text-ash mt-1 max-w-2xl line-clamp-1">{course.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end lg:self-center">
                  <div className="text-right font-mono text-xs">
                    <div className="text-bone font-bold">
                      {course.tier === "free" ? "Free" : `₦${course.priceNgn.toLocaleString()} / $${course.priceUsd}`}
                    </div>
                    <div className="text-[10px] text-ash-dim">
                      {course.modules.length} Modules
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingCourse(course)}
                      className="p-2 rounded-lg border border-card-line text-ash hover:text-ember hover:border-ember transition-colors"
                      title="Edit Course"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 rounded-lg border border-card-line text-ash hover:text-flame hover:border-flame transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                      className="p-2 rounded-lg border border-card-line text-ash hover:text-bone transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Modules Summary */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-card-line space-y-2">
                  <span className="text-xs font-mono text-ash uppercase tracking-wider block mb-2">
                    Curriculum Modules:
                  </span>
                  {course.modules.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-lg bg-ink/60 border border-card-line/50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-ember font-bold">0{idx + 1}.</span>
                        <span className="text-bone font-medium">{m.title}</span>
                        <span className="text-ash-dim font-mono">({m.questions?.length || 0} questions)</span>
                      </div>
                      <span className="text-ash font-mono">{m.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
