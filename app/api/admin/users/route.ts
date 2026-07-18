import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) return NextResponse.json({ users: [], count: 0 });
  return NextResponse.json({
    users: data.users,
    count: data.users.length,
  });
}