import fs from "fs";
import path from "path";
import { Course, CourseEnrollment, PaymentTransaction } from "./courses-types";
import { INITIAL_COURSES } from "./initial-courses";
import { supabase } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const COURSES_FILE = path.join(DATA_DIR, "academy-courses.json");
const ENROLLMENTS_FILE = path.join(DATA_DIR, "academy-enrollments.json");
const TRANSACTIONS_FILE = path.join(DATA_DIR, "academy-transactions.json");

function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(COURSES_FILE)) {
    fs.writeFileSync(COURSES_FILE, JSON.stringify(INITIAL_COURSES, null, 2), "utf8");
  }
  if (!fs.existsSync(ENROLLMENTS_FILE)) {
    fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify([], null, 2), "utf8");
  }
  if (!fs.existsSync(TRANSACTIONS_FILE)) {
    fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

// ── COURSES REPOSITORY ──
export async function getCourses(): Promise<Course[]> {
  // Attempt Supabase fetch first
  try {
    const { data, error } = await supabase.from("academy_courses").select("*").order("createdAt", { ascending: false });
    if (!error && data && data.length > 0) {
      return data as Course[];
    }
  } catch {
    // fallback to local JSON
  }

  ensureDataFiles();
  try {
    const content = fs.readFileSync(COURSES_FILE, "utf8");
    return JSON.parse(content) as Course[];
  } catch {
    return INITIAL_COURSES;
  }
}

export async function getCourseById(idOrSlug: string): Promise<Course | null> {
  const courses = await getCourses();
  const found = courses.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
  return found || null;
}

export async function saveCourse(course: Course): Promise<Course> {
  // Attempt Supabase upsert
  try {
    await supabase.from("academy_courses").upsert(course);
  } catch {
    // fallback
  }

  ensureDataFiles();
  const courses = await getCourses();
  const index = courses.findIndex((c) => c.id === course.id);
  if (index >= 0) {
    courses[index] = course;
  } else {
    courses.unshift(course);
  }
  fs.writeFileSync(COURSES_FILE, JSON.stringify(courses, null, 2), "utf8");
  return course;
}

export async function deleteCourse(id: string): Promise<boolean> {
  try {
    await supabase.from("academy_courses").delete().eq("id", id);
  } catch {
    // fallback
  }

  ensureDataFiles();
  const courses = await getCourses();
  const filtered = courses.filter((c) => c.id !== id);
  fs.writeFileSync(COURSES_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}

// ── ENROLLMENTS REPOSITORY ──
export async function getEnrollments(): Promise<CourseEnrollment[]> {
  try {
    const { data, error } = await supabase.from("academy_enrollments").select("*");
    if (!error && data && data.length > 0) {
      return data as CourseEnrollment[];
    }
  } catch {
    // fallback
  }

  ensureDataFiles();
  try {
    const content = fs.readFileSync(ENROLLMENTS_FILE, "utf8");
    return JSON.parse(content) as CourseEnrollment[];
  } catch {
    return [];
  }
}

export async function getUserEnrollment(userId: string, courseId: string): Promise<CourseEnrollment | null> {
  const all = await getEnrollments();
  return all.find((e) => e.userId === userId && e.courseId === courseId) || null;
}

export async function saveEnrollment(enrollment: CourseEnrollment): Promise<CourseEnrollment> {
  try {
    await supabase.from("academy_enrollments").upsert(enrollment);
  } catch {
    // fallback
  }

  ensureDataFiles();
  const all = await getEnrollments();
  const index = all.findIndex((e) => e.id === enrollment.id || (e.userId === enrollment.userId && e.courseId === enrollment.courseId));
  if (index >= 0) {
    all[index] = enrollment;
  } else {
    all.push(enrollment);
  }
  fs.writeFileSync(ENROLLMENTS_FILE, JSON.stringify(all, null, 2), "utf8");
  return enrollment;
}

// ── TRANSACTIONS REPOSITORY ──
export async function getTransactions(): Promise<PaymentTransaction[]> {
  try {
    const { data, error } = await supabase.from("academy_transactions").select("*");
    if (!error && data && data.length > 0) {
      return data as PaymentTransaction[];
    }
  } catch {
    // fallback
  }

  ensureDataFiles();
  try {
    const content = fs.readFileSync(TRANSACTIONS_FILE, "utf8");
    return JSON.parse(content) as PaymentTransaction[];
  } catch {
    return [];
  }
}

export async function recordTransaction(tx: PaymentTransaction): Promise<PaymentTransaction> {
  try {
    await supabase.from("academy_transactions").insert(tx);
  } catch {
    // fallback
  }

  ensureDataFiles();
  const all = await getTransactions();
  all.unshift(tx);
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(all, null, 2), "utf8");
  return tx;
}
