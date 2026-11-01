import { NextRequest, NextResponse } from "next/server";
import { getEnrollments, getUserEnrollment, saveEnrollment, getCourseById } from "@/lib/courses-repo";
import { CourseEnrollment, ModuleProgress } from "@/lib/courses-types";

// GET /api/enrollments?userId=xyz&courseId=abc
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    if (userId && courseId) {
      const enrollment = await getUserEnrollment(userId, courseId);
      return NextResponse.json(enrollment || null);
    }

    if (userId) {
      const all = await getEnrollments();
      const userList = all.filter((e) => e.userId === userId);
      return NextResponse.json(userList);
    }

    // Admin listing
    const all = await getEnrollments();
    return NextResponse.json(all);
  } catch (e) {
    console.error("Error fetching enrollments:", e);
    return NextResponse.json([], { status: 500 });
  }
}

// POST /api/enrollments
// Enrolls or updates quiz score
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userEmail, userName, courseId, action, moduleId, score, answers } = body;

    if (!userId || !courseId) {
      return NextResponse.json({ error: "userId and courseId required" }, { status: 400 });
    }

    const course = await getCourseById(courseId);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    let enrollment = await getUserEnrollment(userId, courseId);

    // Initial enrollment action
    if (!enrollment) {
      const isFree = course.tier === "free";
      enrollment = {
        id: `enroll-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        userId,
        userEmail: userEmail || "anonymous@phoenix.org",
        userName: userName || userEmail?.split("@")[0] || "Phoenix Student",
        courseId,
        enrolledAt: new Date().toISOString(),
        coursePaid: isFree,
        certPaid: false,
        moduleProgress: {},
        allModulesPassed: false,
      };
    }

    // Submit quiz action
    if (action === "submit_quiz" && moduleId && typeof score === "number") {
      const passed = score >= 70;
      const prevProgress: ModuleProgress = enrollment.moduleProgress[moduleId] || {
        moduleId,
        bestScore: 0,
        passed: false,
        attempts: 0,
      };

      const updatedProgress: ModuleProgress = {
        moduleId,
        bestScore: Math.max(prevProgress.bestScore, score),
        passed: prevProgress.passed || passed,
        attempts: (prevProgress.attempts || 0) + 1,
        completedAt: passed ? new Date().toISOString() : prevProgress.completedAt,
      };

      enrollment.moduleProgress[moduleId] = updatedProgress;

      // Check if all modules are passed
      const allPassed = course.modules.length > 0 && course.modules.every((m) => {
        const p = enrollment?.moduleProgress[m.id];
        return p && p.passed;
      });

      if (allPassed) {
        enrollment.allModulesPassed = true;
        if (!enrollment.completedAt) {
          enrollment.completedAt = new Date().toISOString();
        }
        if (!enrollment.certificateId) {
          enrollment.certificateId = `PHX-${course.slug.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
        }
      }
    }

    // Mark certificate paid
    if (action === "mark_cert_paid") {
      enrollment.certPaid = true;
      enrollment.certificateIssuedAt = new Date().toISOString();
      if (!enrollment.certificateId) {
        enrollment.certificateId = `PHX-${course.slug.toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
      }
    }

    // Mark course paid (for paid courses)
    if (action === "mark_course_paid") {
      enrollment.coursePaid = true;
    }

    const saved = await saveEnrollment(enrollment);
    return NextResponse.json(saved);
  } catch (e) {
    console.error("Error managing enrollment:", e);
    return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 });
  }
}
