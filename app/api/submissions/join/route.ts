import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = await supabase.from("submissions").insert({
      type: "join",
      submitted_at: new Date().toISOString(),
      data: body,
      status: "new",
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("type", "join")
    .order("submitted_at", { ascending: false });
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}