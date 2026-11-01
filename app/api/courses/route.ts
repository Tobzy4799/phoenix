import { NextRequest, NextResponse } from "next/server";
import { getCourses, saveCourse, deleteCourse } from "@/lib/courses-repo";
import { Course } from "@/lib/courses-types";

// GET /api/courses?tier=free|paid
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tier = searchParams.get("tier");
    const all = await getCourses();

    if (tier === "free" || tier === "paid") {
      const filtered = all.filter((c) => c.tier === tier);
      return NextResponse.json(filtered);
    }

    return NextResponse.json(all);
  } catch (e) {
    console.error("Error fetching courses:", e);
    return NextResponse.json([], { status: 500 });
  }
}

// POST /api/courses (Create or Update course)
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<Course>;
    if (!body.title || !body.tier) {
      return NextResponse.json({ error: "Title and tier are required" }, { status: 400 });
    }

    const id = body.id || `course-${Date.now()}`;
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newCourse: Course = {
      id,
      slug,
      title: body.title,
      tagline: body.tagline || "",
      description: body.description || "",
      tier: body.tier === "paid" ? "paid" : "free",
      priceNgn: Number(body.priceNgn) || 0,
      priceUsd: Number(body.priceUsd) || 0,
      certPriceNgn: Number(body.certPriceNgn) || 0,
      certPriceUsd: Number(body.certPriceUsd) || 0,
      level: body.level || "Beginner",
      category: body.category || "General",
      badge: body.badge || "Certification",
      estimatedHours: body.estimatedHours || "3 Hours",
      modules: body.modules || [],
      published: body.published ?? true,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    const saved = await saveCourse(newCourse);
    return NextResponse.json(saved, { status: 201 });
  } catch (e) {
    console.error("Error saving course:", e);
    return NextResponse.json({ error: "Failed to save course" }, { status: 500 });
  }
}

// DELETE /api/courses
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await deleteCourse(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Error deleting course:", e);
    return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
  }
}
