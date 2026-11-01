"use client";

import { useState } from "react";
import { CourseEnrollment, Course } from "@/lib/courses-types";
import {
  Users,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Filter,
  Layers,
} from "lucide-react";

interface AdminProgressTabProps {
  enrollments: CourseEnrollment[];
  courses: Course[];
}

export default function AdminProgressTab({ enrollments, courses }: AdminProgressTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  const courseTitleMap = courses.reduce<Record<string, string>>((acc, c) => {
    acc[c.id] = c.title;
    return acc;
  }, {});

  const filtered = enrollments.filter((e) => {
    const matchesSearch =
      (e.userEmail && e.userEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.userName && e.userName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.courseId && e.courseId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCourse = courseFilter === "all" || e.courseId === courseFilter;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs text-ember uppercase tracking-wider">
            Student Analytics
          </span>
          <h2 className="font-display text-2xl text-bone mt-1">Student Course Progress</h2>
          <p className="text-xs text-ash mt-0.5">
            Monitor student module progression, quiz scores (70% threshold), and certification completions.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-card border border-card-line">
            <span className="text-ash-dim">Total Enrollments:</span>{" "}
            <span className="text-bone font-bold">{enrollments.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-card border border-card-line">
            <span className="text-ash-dim">Certificates Issued:</span>{" "}
            <span className="text-emerald-400 font-bold">
              {enrollments.filter((e) => e.allModulesPassed).length}
            </span>
          </div>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ash" />
          <input
            type="text"
            placeholder="Search by student email, name, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border border-card-line rounded-xl pl-10 pr-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
          />
        </div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="bg-card border border-card-line rounded-xl px-4 py-2.5 text-xs text-bone focus:border-ember focus:outline-none"
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Enrollments Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card/20 rounded-2xl border border-card-line">
          <Users size={32} className="mx-auto text-ash mb-2 opacity-50" />
          <p className="text-xs text-ash">No student enrollments found matching your query.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-card-line bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-card-line bg-ink/60 font-mono text-[11px] text-ash uppercase tracking-wider">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Modules Passed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Certificate</th>
                  <th className="py-3 px-4">Enrolled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-line/50 font-mono text-xs">
                {filtered.map((en) => {
                  const passedModulesCount = Object.values(en.moduleProgress || {}).filter(
                    (p) => p.passed
                  ).length;
                  const totalModules =
                    courses.find((c) => c.id === en.courseId)?.modules.length || 3;

                  return (
                    <tr key={en.id} className="hover:bg-ink/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-bone">{en.userName || "Student"}</div>
                        <div className="text-[11px] text-ash-dim">{en.userEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 text-ash">
                        {courseTitleMap[en.courseId] || en.courseId}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-bone font-bold">
                            {passedModulesCount} / {totalModules}
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-ink border border-card-line overflow-hidden">
                            <div
                              className="h-full grad-flame"
                              style={{
                                width: `${Math.round((passedModulesCount / totalModules) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {en.allModulesPassed ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[10px]">
                            <CheckCircle2 size={12} /> COMPLETED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-ember font-semibold bg-ember/10 px-2.5 py-0.5 rounded-full border border-ember/20 text-[10px]">
                            <Clock size={12} /> IN PROGRESS
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {en.certificateId ? (
                          <div className="text-bone font-bold flex items-center gap-1">
                            <Award size={14} className="text-ember" />
                            {en.certificateId}
                          </div>
                        ) : (
                          <span className="text-ash-dim">Pending (Need 70%)</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-ash-dim text-[11px]">
                        {new Date(en.enrolledAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
