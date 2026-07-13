import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("nft_collabs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json([], { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const details = formData.get("details") as string;
    const x_handle = formData.get("x_handle") as string;
    const x_link = formData.get("x_link") as string;
    const post_link = formData.get("post_link") as string;
    const winners_link = formData.get("winners_link") as string;
    const image = formData.get("image") as File;

    // Upload image to Supabase Storage
    const fileExt = image.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("nft-collabs")
      .upload(fileName, buffer, {
        contentType: image.type,
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("nft-collabs")
      .getPublicUrl(fileName);

    const image_url = urlData.publicUrl;

    const { error: insertError } = await supabase.from("nft_collabs").insert({
      title,
      image_url,
      details,
      x_handle,
      x_link,
      post_link,
      winners_link,
      created_at: new Date().toISOString(),
    });

    if (insertError) throw insertError;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const { error } = await supabase.from("nft_collabs").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}