import { NextRequest, NextResponse } from "next/server";
import { getCourseById } from "@/lib/courses-repo";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await getCourseById(id);
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(course);
  } catch (e) {
    console.error("Error fetching single course:", e);
    return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
  }
}
