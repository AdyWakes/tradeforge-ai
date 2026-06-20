import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/invoices",
  "/trust-score",
  "/fraud",
  "/blockchain",
  "/escrow",
  "/trades",
  "/analytics",
  "/admin",
  "/companies"
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasDemoSession = request.cookies.get("tf_session")?.value === "demo";
  const hasSupabaseSession = request.cookies
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-"));

  if (hasDemoSession || hasSupabaseSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/invoices/:path*",
    "/trust-score/:path*",
    "/fraud/:path*",
    "/blockchain/:path*",
    "/escrow/:path*",
    "/trades/:path*",
    "/analytics/:path*",
    "/admin/:path*",
    "/companies/:path*"
  ]
};
