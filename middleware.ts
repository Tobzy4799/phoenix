import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const GATED_ROUTES = [
  "/agency",
  "/academy",
  "/campus-network",
  "/community",
  "/dao-nft",
];

const ADMIN_ROUTES = ["/admin"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Handle admin routes with password cookie
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    const session = req.cookies.get("phoenix_admin_session")?.value;
    if (session !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // Handle gated routes with Supabase auth
  const isGated = GATED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!isGated) return NextResponse.next();

  // Check Supabase session
  let response = NextResponse.next({ request: req });

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://qdqikjbnmqbuumqawwbv.supabase.co";
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-anon-key";

  const supabase = createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
          response = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/agency/:path*",
    "/agency",
    "/academy",
    "/campus-network",
    "/community",
    "/dao-nft",
  ],
};